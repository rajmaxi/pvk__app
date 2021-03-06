# frozen_string_literal: true

module RuboCop
  module RSpec
    module Language
      # Common node matchers used for matching against the rspec DSL
      module NodePattern
        extend RuboCop::NodePattern::Macros

        def_node_matcher :example_group?, ExampleGroups::ALL.block_pattern
        def_node_matcher :shared_group?, SharedGroups::ALL.block_pattern

        spec_groups = ExampleGroups::ALL + SharedGroups::ALL
        def_node_matcher :spec_group?, spec_groups.block_pattern

        def_node_matcher :example_group_with_body?, <<-PATTERN
          (block #{ExampleGroups::ALL.send_pattern} args [!nil?])
        PATTERN

        def_node_matcher :example?, Examples::ALL.block_pattern

        def_node_matcher :hook?, Hooks::ALL.block_pattern

        def_node_matcher :let?, Helpers::ALL.block_or_block_pass_pattern

        def_node_matcher :subject?, Subject::ALL.block_pattern
      end
    end
  end
end
