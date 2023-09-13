export class GeoLocate{
    ip: string= '';
    location = new Location();
    domains = [];
    as = new As();
    isp = '';
}

export class Location {
    country = '';
    region = '';
    city = '';
    lat = 0;
    lng = 0;
    postalCode = '';
    timezone = '';
    geonameId = 0;

}
export class As{
    asn = 0;
    name = '';
    route = '';
    domain = '';
    type = '';
}