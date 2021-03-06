# frozen_string_literal: true

require "os/mac/version"

module OS
  module Mac
    class SDK
      attr_reader :version, :path, :source

      def initialize(version, path, source)
        @version = OS::Mac::Version.new version
        @path = Pathname.new(path)
        @source = source
      end
    end

    class BaseSDKLocator
      class NoSDKError < StandardError; end

      def sdk_for(v)
        path = sdk_paths[v]
        raise NoSDKError if path.nil?

        SDK.new v, path, source
      end

      def latest_sdk
        return if sdk_paths.empty?

        v, path = sdk_paths.max { |a, b| OS::Mac::Version.new(a[0]) <=> OS::Mac::Version.new(b[0]) }
        SDK.new v, path, source
      end

      def all_sdks
        sdk_paths.map { |v, p| SDK.new v, p, source }
      end

      def sdk_if_applicable(v = nil)
        sdk = begin
          if v.nil?
            sdk_for OS::Mac.version
          else
            sdk_for v
          end
        rescue BaseSDKLocator::NoSDKError
          latest_sdk
        end
        # Only return an SDK older than the OS version if it was specifically requested
        return unless v || (!sdk.nil? && sdk.version >= OS::Mac.version)

        sdk
      end

      def source
        nil
      end

      private

      def sdk_prefix
        ""
      end

      def sdk_paths
        @sdk_paths ||= begin
          # Bail out if there is no SDK prefix at all
          if !File.directory? sdk_prefix
            {}
          else
            paths = {}

            Dir[File.join(sdk_prefix, "MacOSX*.sdk")].each do |sdk_path|
              version = sdk_path[/MacOSX(\d+\.\d+)u?\.sdk$/, 1]
              paths[version] = sdk_path unless version.nil?
            end

            paths
          end
        end
      end
    end

    class XcodeSDKLocator < BaseSDKLocator
      def source
        :xcode
      end

      private

      def sdk_prefix
        @sdk_prefix ||= begin
          # Xcode.prefix is pretty smart, so let's look inside to find the sdk
          sdk_prefix = "#{Xcode.prefix}/Platforms/MacOSX.platform/Developer/SDKs"
          # Finally query Xcode itself (this is slow, so check it last)
          sdk_platform_path = Utils.popen_read(DevelopmentTools.locate("xcrun"), "--show-sdk-platform-path").chomp
          sdk_prefix = File.join(sdk_platform_path, "Developer", "SDKs") unless File.directory? sdk_prefix

          sdk_prefix
        end
      end
    end

    class CLTSDKLocator < BaseSDKLocator
      def source
        :clt
      end

      private

      # While CLT SDKs existed prior to Xcode 10, those packages also
      # installed a traditional Unix-style header layout and we prefer
      # using that
      # As of Xcode 10, the Unix-style headers are installed via a
      # separate package, so we can't rely on their being present.
      # This will only look up SDKs on Xcode 10 or newer, and still
      # return nil SDKs for Xcode 9 and older.
      def sdk_prefix
        @sdk_prefix ||= begin
          if !CLT.provides_sdk?
            ""
          else
            "#{CLT::PKG_PATH}/SDKs"
          end
        end
      end
    end
  end
end
