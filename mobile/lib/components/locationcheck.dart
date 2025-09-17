import 'dart:async';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:geolocator/geolocator.dart';
import 'package:permission_handler/permission_handler.dart';

Future<void> locateUser() async {
  bool serviceEnabled;
  LocationPermission permission;

  permission = await Geolocator.checkPermission();
  // debugPrint("ptest permission: $permission");
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied) {
      // Permissions are denied, next time you could try
      // requesting permissions again (this is also where
      // Android's shouldShowRequestPermissionRationale
      // returned true. According to Android guidelines
      // your App should show an explanatory UI now.
      return Future.error('Location permissions are denied');
    }
  }

  // if (permission == LocationPermission.deniedForever) {
  //   // Permissions are denied forever, handle appropriately.
  //   return Future.error(
  //       'Location permissions are permanently denied, we cannot request permissions.');
  // }

  //ask for high accuracy location android 12
  var accuracy = await Geolocator.getLocationAccuracy();
  // debugPrint("ptest accuracy: $accuracy");
  if (accuracy == LocationAccuracyStatus.reduced) {
    permission = await Geolocator.requestPermission();
  }
  // Test if location services are enabled.
  serviceEnabled = await Geolocator.isLocationServiceEnabled();
  // if (!serviceEnabled) {
  //   // Location services are not enabled don't continue
  //   // accessing the position and request users of the
  //   // App to enable the location services.
  //   // serviceEnabled = await Geolocator.isLocationServiceEnabled();

  //   // return Future.error('Location services are disabled.');
  //   await Geolocator.openLocationSettings();

  // }
  if (!serviceEnabled) {
    // debugPrint("serviceEnabled: $serviceEnabled");
    // //works - opens system location settings to enable location service
    // await Geolocator.openLocationSettings();
    // //works
    try {
      await Geolocator
          .getCurrentPosition(); //ask for location service through popup
    } catch (e) {
      // debugPrint("error: $e");
    }
  }

  // print("accuracy: $accuracy");
  // Geolocator.getCurrentPosition(
  //     desiredAccuracy: LocationAccuracy.bestForNavigation);
}

ValueNotifier<double> distance = ValueNotifier(double.infinity);

distanceBetween(double sLat, double sLong, double dLat, double dLong) {
  var dist = Geolocator.distanceBetween(sLat, sLong, dLat, dLong);
  // print(dist);
  distance.value = dist;
}
