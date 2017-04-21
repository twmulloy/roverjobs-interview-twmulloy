### Search

#### Search Endpoints Discovery

**`https://www.rover.com/api/v3/search-endpoints/`**

```javascript
{
    "overnight-boarding": "https://www.rover.com/api/v3/search/dog-boarding/",
    "overnight-traveling": "https://www.rover.com/api/v3/search/overnight-traveling/",
    "drop-in": "https://www.rover.com/api/v3/search/drop-in/",
    "doggy-day-care": "https://www.rover.com/api/v3/search/doggy-day-care/",
    "dog-walking": "https://www.rover.com/api/v3/search/dog-walking/"
}
```

NOTE: This endpoint will be implemented in API v4 under the current non-namespaced search endpoint
which is deprecated starting with this version.

#### Search Endpoints

**`https://www.rover.com/api/v3/search/<service-type-slug>/`**

Currently, `service-type-slug` can be one of:
* `overnight-boarding`
* `overnight-traveling`
* `drop-in`
* `doggy-day-care`
* `dog-walking`

Each service type specific endpoint allows the following two HTTP method:
* `OPTIONS`: Can be used to determine the list of applicable search filters (see [OPTIONS Search Endpoint](#options-search-endpoint))
* `GET`: Retrieve a list of search results for the provided search filters (see [GET Search Endpoint](#get-search-endpoint))

#### OPTIONS Search Endpoint

**`OPTIONS` `https://www.rover.com/api/v3/search/<service-type-slug>/`**

On success, you'll get the standard OPTIONS response (see [OPTIONS](#options)
section for the detailed spec).

The `GET` action will define all the optional filters together with all
the required metadata about them. The client apps will render the filters
accordingly and will pass the selected values to the [GET Search Endpoint](#get-search-endpoint).

These filters are basically generalized action parameters as seen in the
[OPTIONS](#options) section. They can have one of the supported types and provide
some extra metadata that is specific to just the Search Endpoint.

The following extra attributes are specific to search filters:
* `category`: The identifier of the filter category.
* `category_rank`: The rank of the category within all categories.
* `category_display_name`: The human readable category for display in the UI
* `rank`: An ordering field that can be used on the client apps to order filters
          on the UI

The search filters will include the `icon` attribute, which will be constructed
as follows: `filter-<parameter_name>`. The apps can display or not the icons based
on their own business / design rules.

Some of the choices might have icons included as well. The icon handles will be
constructed as follows: `<parameter_name>-<choice_value>`. See examples below.

##### Examples

```
HTTP/1.1 200 OK
Content-Type: application/json
```

```javascript
{
    "name": "Search",
    "description": "Search compatible providers around location",
    "renders": [
        "application/json",
        "text/html"
    ],
    "parses": [
        "application/json"
    ],
    "actions": {
        "GET": {
            "start_date": { // Will be included if contiguous service type
                "type": "date",
                "required": false,
                "label": "Drop Off",
                "help_text": "The date of the drop-off at the sitter's location",
                "category": "service_details",
                "category_rank": 1,
                "category_display_name": "Service Details",
                "rank": 1
            },
            "end_date": { // Will be included if contiguous service type
                "type": "date",
                "required": false,
                "label": "Pick Up",
                "help_text": "The date of the pick-up from the sitter's location",
                "category": "service_details",
                "category_rank": 1,
                "category_display_name": "Service Details",
                "rank": 2
            },
            "days": { // Will be included if non-contiguous service type
                "type": "multiple choice",
                "required": false,
                "label": "Which days would you like a walk?",
                "icon": "filter-days",
                "help_text": "",
                "choices": [
                    {
                        "value": "monday",
                        "display_name": "Monday"
                    },
                    ...
                    {
                        "value": "sunday",
                        "display_value": "Sunday"
                    }
                ],
                "category": "service_details",
                "category_rank": 1,
                "category_display_name": "Service Details",
                "rank": 2
            },
            "pets": { // Will only be included if authenticated
                "type": "multiple choice",
                "required": false,
                "label": "Your Pets",
                "help_text": "Select the pets you need boarding for",
                "choices": [
                    {
                        "value": "https://www.rover.com/api/v3/pets/:opk/",
                        "display_name": "Buddy"
                    },
                    {
                        "value": "https://www.rover.com/api/v3/pets/:opk/",
                        "display_name": "Sam"
                    }
                ],
                "category": "service_details",
                "category_rank": 1,
                "category_display_name": "Service Details",
                "rank": 3
            },
            "pet_sizes": { // Will only be included if unauthenticated
                "type": "multiple choice",
                "required": false,
                "label": "How large is your dog (in lbs)?",
                "icon": "filter-pet_sizes",
                "help_text": "",
                "choices": [
                    {
                        "value": "small",
                        "display_name": "Small (0-15)",
                        "icon": "pet_sizes-small"
                    },
                    {
                        "value": "medium",
                        "display_name": "Medium (16-40)",
                        "icon": "pet_sizes-medium"
                    },
                    {
                        "value": "large",
                        "display_name": "Large (41-100)",
                        "icon": "pet_sizes-large"
                    },
                    {
                        "value": "giant",
                        "display_name": "Giant (100+)",
                        "icon": "pet_sizes-giant"
                    }
                ],
                "category": "service_details",
                "category_rank": 1,
                "category_display_name": "Service Details",
                "rank": 3
            },
            "min_price": {
                "type": "integer",
                "required": false,
                "label": "Mimimum Rate Per Night",
                "help_text": "",
                "min_value": 10,
                "max_value": 145,
                "category": "service_details",
                "category_rank": 1,
                "category_display_name": "Service Details",
                "rank": 5
            },
            "max_price": {
                "type": "integer",
                "required": false,
                "label": "Maximum Rate Per Night",
                "help_text": "",
                "min_value": 15,
                "max_value": 150,
                "category": "service_details",
                "category_rank": 1,
                "category_display_name": "Service Details",
                "rank": 6
            },
            /* ... */
            "puppy_care": {
                "type": "boolean",
                "required": false,
                "label": "Puppy care",
                "help_text": "",
                "category": "special_services",
                "category_rank": 4,
                "category_display_name": "Special Services",
                "rank": 1
            },
            "bathing_grooming": {
                "type": "boolean",
                "required": false,
                "label": "Bathing / Grooming",
                "help_text": "",
                "category": "special_services",
                "category_rank": 4,
                "category_display_name": "Special Services",
                "rank": 2
            },
            /* ... */
            "oral_medication": {
                "type": "boolean",
                "required": false,
                "label": "Oral medication administration",
                "help_text": "",
                "category": "provider_skills",
                "category_rank": 6,
                "category_display_name": "Sitter's Skills",
                "rank": 6
            }
        }
    }
}
```

#### GET Search Endpoint

**`GET` `https://www.rover.com/api/v3/search/<service-type-slug>/?<search filters>`**

After rendering all the filters and applying all the validation rules driven by the OPTIONS
endpoint, the client apps can perform the actual search by calling the same URL and passing
the selected filters as query arguments.

Here are the rules for serializing the filters into GET arguments so that the backend knows
how to deserialize them. Note that all the string values must be urlencoded.

| filter type | example | notes |
|-------------|---------|-------|
| string      | filter=value | value is a string |
| choice      | filter=value | value matches the choice value attribute |
| multiple choice | filter=value1&filter=value4 | same as for choice |
| integer     | filter=value | value is an integer |
| date        | filter=value | value is an ISO-formatted date string |
| datetime    | filter=2016-12-08T11%3A33%3A10 | value is an ISO-formatted datetime string |
| decimal     | filter=-122.45123 | value is a decimal |

TBD - Examples

##### Deprecated Search API

**`GET` `https://www.rover.com/api/v3/search/?service_type=dog-walking&monday=true&wednesday=true&friday=true`**

By default, they will all default to false in which case no
availability filtering will be done.  Additionally, these fields
will be ignored for any search for which the service type does
not support non-contiguous dates.

**`GET` `https://www.rover.com/api/v3/search/`**

```bash
$ curl --dump-header - \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --header "Authorization: ApiKey bob-smith:a94a8fe5ccb19ba61c4c0873d391e987982fbbd3" \
    --request GET "https://www.rover.com/api/v3/search/"
```

```javascript
{
   "count":153,
   "derived_data":{
      "center":[
         "47.600000",
         "-122.330000"
      ],
      "maxlng":"-122.284681396",
      "minlng":"-122.375318604",
      "zoom_method":"zoomlevel",
      "zoomlevel":12,
      "minlat":"47.5546813965",
      "maxlat":"47.6453186035",
      "location_type":"city"
   },
   "service_results_header":"In your sitter's home",
   "page_count":8,
   "results":[
      {
         "person_summary":null,
         "friend_description":null,
         "reviews_count":5,
         "long_stays":true,
         "neighborhood":"Madrona",
         "include_debug_popover":null,
         "featured_description":"",
         "price_unit":"night",
         "popover_debug_data":null,
         "review_text":"If you are looking for a great couple of buddies for your dog while you are gone, then look no farther! Ryan and Oslo (his dog) took awesome care of our Tubby Bear and we couldn't be happier:) Ryan sent frequent updates with pics which not only allowed us to enjoy our trip worry free, but also made our days even better because we were able to see Tubby smiling and playing away! ",
         "rank":1,
         "featured":false,
         "is_favorite":false,
         "city":"Seattle",
         "thumb":"//res.cloudinary.com/rover-com/image/upload/a_exif,c_fill,fl_progressive,g_face:center,h_200,w_200/vf10yos9rczrd4fhi2wf.jpg",
         "zip":"98122",
         "title":"Big Dog Buddy",
         "is_past_customer":false,
         "friend_degree":null,
         "urgency_cues":[
            {
               "text":"This sitter was last active 2Â weeks ago",
               "name":"person_last_active",
               "value":"06/26/15"
            }
         ],
         "state":"WA",
         "contact_url":"/members/ryan-l-big-dog-buddy/?service=home&maxlng=-122.284681396&minlng=-122.375318604&centerlng=-122.330000&apt=False&maxprice=100&zoomlevel=12&minlat=47.5546813965&contact=1&hs=False&maxlat=47.6453186035&centerlat=47.600000&promoted=False&per_page=20&minprice=10&type=homes&refer=search",
         "service_type":"overnight-boarding",
         "pk":179816,
         "type":"homes",
         "person_name":"Ryan L.",
         "description":"Hi! Big dog lover here.. the bigger the better! I grew up with dogs, lived through my own Marley & Me with a great yellow Lab named Zak, and am cur...",
         "person_thumb":"//res.cloudinary.com/rover-com/image/upload/a_exif,c_fill,fl_progressive,g_face:center,h_100,w_100/bfepy8w6cgvl33kntuon.jpg",
         "result_number":1,
         "price":"35.00",
         "review_dog_photo_url":"//res.cloudinary.com/rover-com/image/upload/a_exif,c_fill,fl_progressive,g_face:center,h_100,w_100/hne61hzdqdfgbyn9qy3j.jpg",
         "latitude":"47.608",
         "featured_label":"",
         "summary_url":"http://127.0.0.1:8000/api/v3/people/:opk/summary/",
         "contact_form_url":"/members/ryan-l-big-dog-buddy/contact_form/179816/",
         "badge_data":[

         ],
         "is_accepting_new_customers":true,
         "url":"http://127.0.0.1:8000/api/v3/people/:opk/",
         "service_pk":179816,
         "longitude":"-122.286",
         "friend_title":null,
         "reviews":[
            {
               "content":"Ryan took wonderful care of my high energy yellow lab Bruce. He provided me with updates frequently and I felt completely at ease while I was away. I will definitely use Ryan again int he future!",
               "dog_photo_url":"//res.cloudinary.com/rover-com/image/upload/a_exif,c_fill,fl_progressive,g_face:center,h_100,w_100/ccqg98rnexuv1pfzmw4s.jpg"
            },
            {
               "content":"If you are looking for a great couple of buddies for your dog while you are gone, then look no farther! Ryan and Oslo (his dog) took awesome care of our Tubby Bear and we couldn't be happier:) Ryan sent frequent updates with pics which not only allowed us to enjoy our trip worry free, but also made our days even better because we were able to see Tubby smiling and playing away! ",
               "dog_photo_url":"//res.cloudinary.com/rover-com/image/upload/a_exif,c_fill,fl_progressive,g_face:center,h_100,w_100/hne61hzdqdfgbyn9qy3j.jpg"
            },
            {
               "content":"Ryan is super friendly and took great care of Evie. He sent me pictures every day and I knew that she was in such good hands that I didn't even miss her as much. His dog is great and matched the energy level of my dog perfectly. Honestly, I think Evie was pretty sad to leave. Thanks Ryan :)",
               "dog_photo_url":"/static/images/profilable/defaults/big_thumb.png"
            }
         ],
         "ratings_average":"5.0",
         "ratings_count":4,
         "pct_stays_with_photos":50.0,
         "person_has_video":false
      },
      ...
   ],
   "next":"http://127.0.0.1:8000/api/v3/search/?service_type=overnight-boarding&format=json&centerlng=-122.33&page=2&centerlat=47.60",
   "date_constrained":false,
   "params":{
      "minlng":"-122.375318604",
      "service_type":"overnight-boarding",
      "maxlng":"-122.284681396",
      "agency":[

      ],
      "maxprice":"100",
      "hs":false,
      "centerlng":"-122.330000",
      "zoomlevel":12,
      "minlat":"47.5546813965",
      "apt":false,
      "maxlat":"47.6453186035",
      "centerlat":"47.600000",
      "promoted":false,
      "per_page":20,
      "minprice":"10"
   },
   "service_type":"overnight-boarding",
   /* Short description of the search query.
        Describes locations, dates, dogs and price. */
   "query_description":"Near 98107,Jul 4 - Jul 10,1-15lbs,16-40lbs,$37-$50",
   "query":{
      "person_summary":false,
      "no_children_6_12":false,
      "petsitusa":false,
      "apartments":false,
      "centerlat":"47.600000",
      "maxlng":null,
      "spaces_required":1,
      "maxprice":100,
      "apt":false,
      "zoomlevel":12,
      "minlat":null,
      "radius":null,
      "doggy_day_care":false,
      "per_page":20,
      "senior_dog_care":false,
      "volunteer_donor":false,
      "injected_medication":false,
      "has_fenced_yard":false,
      "person_does_not_have_dogs":false,
      "pet":[ ],
      "agency":[ ],
      "search_score_debug":false,
      "special_needs":false,
      "females_in_heat":false,
      "uncrated_dogs":false,
      "unspayed_females":false,
      "location":"",
      "oral_medication":false,
      "service_type":"overnight-boarding",
      "minprice":10,
      "has_no_children":false,
      "start_date":null,
      "excluded_providers":[ ],
      "todate":"",
      "end_date":null,
      "non_smoking":false,
      "knows_first_aid":false,
      "more_than_one_client":false,
      "centerlng":"-122.330000",
      "minlng":null,
      "dogs_allowed_on_furniture":false,
      "no_children_0_5":false,
      "user":null,
      "maxlat":null,
      "dog_preference":"no_pref",
      "no_cats":false,
      "medium_dogs":false,
      "dogs_allowed_on_bed":false,
      "min_rating":null,
      "houses":false,
      "cat_care":false,
      "no_caged_pets":false,
      "puppy":false,
      "non_neutered_males":false,
      "has_house":false,
      "person":null,
      "bathing_grooming":false,
      "large_dogs":false,
      "fromdate":"",
      "giant_dogs":false,
      "hs":false,
      "dog_walking":false,
      "promoted":false,
      "small_dogs":false,
      "page":1,
      "apse":false
   },
   "holiday_rate":false,
   "previous":null,
   "viewport":{
      "minlat":"47.5546813965",
      "minlng":"-122.375318604",
      "maxlat":"47.6453186035",
      "maxlng":"-122.284681396"
   }
}
```

The search endpoint allows many filter parameters to be set as `GET`
parameters.

#### Location

Location data must be provided. You can either give a center point which
we will apply an appropriate zoom level, or you can provided a bounding
box in which the search will be performed.

To specify a center point you must provide a latitude as the parameter
`centerlat`, and a longitude as the parameter `centerlng`.

When provided with a center point, the server will determine an
appropriate zoom level given the number of available sitters. Returned
along with the search results will be the bounding box coordinates of the
final geographic area.

To get the search algorithm to use the exact `centerlat` and `centerlng`
specified. You must pass the `exact=1` parameter. If `exact=1` is not
specified, the search algorithm may modify the center point to be more
generic.

**`GET` `https://www.rover.com/api/v3/search/?centerlat=47.60621&centerlng=-122.33207&exact=1`**

To specify a bounding box you must provide a minimum latitude and
longitude and a maximum latitude and longitude. The parameters are
`minlat`, `minlng`, `maxlat`, `maxlng` respectively.

The `exact` parameter has no effect when `minlat`, `minlng`, `maxlat`,
and `maxlng` are specified. The search algorithm will always use the
exact bounding box specified.

**`GET` `https://www.rover.com/api/v3/search/?minlat=47.2436611719&minlng=-122.694618828&maxlat=47.9687588281&maxlng=-121.969521172`**

The `viewport` object in the response will contain a suggested viewport.
If a bounding box was specified, it will match the bounding box. If no
bounding box was specified, it will be the minimal viewport necessary
to include all returned results. If there are no results, it will be
some reasonable area centered at the specified location.

#### Service Type

Service type must be provided as the `service_type` parameter.

To specify in home dog boarding set it to `overnight-boarding`.

To specify traveling dog boarding set it to `overnight-traveling`.

**`GET` `https://www.rover.com/api/v3/search/?service_type=overnight-boarding`**

#### Pets

You can also list pets to further filter search results to sitters which
will accept the pets listed.

To specify a pet to filter by include the `pet` parameter set to the pet
URL.

To list multiple pets you just repeat the `pet` parameter as many times as
needed.

**`GET` `https://www.rover.com/api/v3/search/?pet=https://www.rover.com/api/v3/pets/:opk/&pet=https://www.rover.com/api/v3/pets/:opk/`**

You can also filter sitters simply based on the size of dogs they sit
for. This is most useful to anonymous users.

To specify a dog size filter use the `dog_size` parameter.

The valid dog sizes are `small`, `medium`, `large`, and `giant`.

Just like filtering on dogs, you can specify the `dog_size` parameter
multiple times.

**`GET`
`https://www.rover.com/api/v3/search/?dog_size=small&dog_size=giant`**

#### Dates

You can filter sitters by their availability by specifying start and
end dates for a stay.

The start date is specified in the `start_date` parameter.

The end date is specified in the `end_date` parameter.

**`GET` `https://www.rover.com/api/v3/search/?start_date=03/11/2014&end_date=03/12/2014`**

#### Price

You can filter sitters by their default nightly rate.

To specify a minimum price set the `minprice` parameter. To specify a
maximum price set the `maxprice` parameter.

**`GET` `https://www.rover.com/api/v3/search/?minprice=10&maxprice=100`**

#### Preferences

You can filter sitters based on whether or not they have a dog at home.

To filter by dog preference you must set the `dog_preference`
parameter.

If you set it to `no_other_dogs` it will return only sitters who don't
own dogs.

If you set it to `other_dogs` it will return only sitters who own dogs.

If you set it to `no_pref` it will do no additional filtering. This is the
default.

**`GET` `https://www.rover.com/api/v3/search/?dog_preference=no_other_dogs`**

You can also filter by the sitters residence type. The two residence
types we track are homes and apartments.

To specify a residence type use the `residence_preference`.

If you set it to `houses` it will only return sitters who own houses.

If you set it to `apartments` it will only return sitters who own
apartments.

If you set it to `no_pref` it will do no additional filtering. This is the
default.

Note: This filtering preference has no impact if `service_type` is
`overnight-traveling`.

**`GET` `https://www.rover.com/api/v3/search/?residence_preference=houses`**

#### Person Summary Field

At the expense of significantly expanding the payload (~4x gzipped), you can
request that we include a `person_summary` field that is equivalent to the
data returned by the person summary endpoint.

**`GET` `https://www.rover.com/api/v3/search/?person_summary=1`**

#### Combining Filters

All the filters can be combined together in order to return highly
filtered search results.

**`GET` `https://www.rover.com/api/v3/search/?centerlat=47.60621&centerlng=-122.33207&service_type=overnight-boarding&start_date=03/11/2014&end_date=03/12/2014`**

