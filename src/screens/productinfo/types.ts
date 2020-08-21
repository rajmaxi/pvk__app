type productprops = {
    name?: string;
    enthusiasmLevel?: number;
    componentId?: string;
    options?: any;
    id: string;
    image: string;
    price_formated: string;
    special_formated: string;
    status: number,
    additional_image_color: string[];
}
type User = {
    aliases: string[];
    id: number;
    manufacturer: string,
    name: string,
    price_formated: string,
    special_formated: string,
    stock_status_id: string,
    stock_status: string,
}
type shareTypes = {
    seo_url: string;
    name: string,
}
type productInfotypes = NavigationComponent<productprops>;