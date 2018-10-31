import os
from django.contrib.gis.utils import LayerMapping
from .models import POI

poi_mapping = {
    'poiID' : 'POIID',
    'name' : 'NAME',
    'latitude' : 'LAT',
    'longitude' : 'LON',
    'address' : 'ADDRESS',
    'description' : 'DESCRIPTION',
    'contactNumber' : 'CONTACTNUMBER',
    'imageFileName' : 'IMAGEFILENAME',
    'lastUpdate' : 'LASTUPDATE',
}

poi_data = os.path.abspath(
    os.path.join(os.path.dirname(__file__), 'data', 'dublin_poi.json'),
)

def run(verbose=True):
    lm = LayerMapping(POI, poi_data, poi_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)