from django.contrib.gis.db import models

class POI(models.Model):
    # Regular Django fields corresponding to the attributes in the
    # dublin_poi json file
    poiID = models.IntegerField
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    address = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    contactNumber = models.CharField(max_length=15)
    imageFileName = models.CharField(max_length=100)
    lastUpdate = models.DateTimeField()

    # Returns the string representation of the model.
    def __str__(self):
        return self.name