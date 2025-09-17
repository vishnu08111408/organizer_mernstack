import 'dart:async';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
// import 'package:get_storage/get_storage.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
// import 'package:techrace/client/location.dart';
// import 'utils/mapstyle.dart';

import 'package:geolocator/geolocator.dart';
import 'package:mobile/api/api.dart';
import 'package:mobile/utils/mapstyle.dart';

//gmap controller
Completer<GoogleMapController> _controller = Completer();

//updates location to be centered on screen if isTracking is true
StreamSubscription<Position> positionStream =
    Geolocator.getPositionStream().listen(
  onError: (error) {
    print("Error: $error");
  },
  (Position position) async {
    // Handle position changes
    final GoogleMapController controller = await _controller.future;
    // debugPrint("animateCamera");
    controller.animateCamera(
      CameraUpdate.newCameraPosition(
        CameraPosition(
          target: LatLng(
            position.latitude,
            position.longitude,
          ),
          zoom: 17,
        ),
      ),
    );
    // distanceBetween(position.latitude, position.longitude);
  },
);

class MapWidget extends StatefulWidget {
  const MapWidget({super.key});

  @override
  State<MapWidget> createState() => MapWidgetState();
}

//late Marker mapMarker;
Set<Marker> mapMarker = <Marker>{};

class MapWidgetState extends State<MapWidget> {
  //map variables
  // double mapTopPadding = 0;

  static const LatLng source = LatLng(19.123188, 72.836062);
  //static const LatLng destination = LatLng(19.240522, 72.869566);

  void addMarker(String title, double lat, double lng, bool state) {
    Marker marker = Marker(
      infoWindow: InfoWindow(
        title: title,
      ),
      markerId: MarkerId(title),
      position: LatLng(lat, lng),
      icon: BitmapDescriptor.defaultMarkerWithHue(
        BitmapDescriptor.hueGreen,
      ),
    );
    if (state) {
      setState(() {
        mapMarker.add(marker);
      });
    } else {
      mapMarker.add(marker);
    }
  }

  RxList hospitals = [].obs;

  //late Marker marker;
  @override
  void initState() {
    super.initState();
    //add all markers for positions that the user has already visited
    Api().getHospitals().then((value) {
      print(value);
      setState(() {
        hospitals.value = value;
      });
      if (hospitals.isNotEmpty) {
        for (var i = 0; i < hospitals.length; i++) {
          addMarker(
              hospitals[i]["name"] ?? "Hx",
              hospitals[i]["location"]["latitude"],
              hospitals[i]["location"]["longitude"],
              false);
        }
        setState(() {
          mapMarker = mapMarker;
        });
      }
    }).catchError((e) {
      Get.snackbar("Error", e.toString());
    });

    Marker marker = Marker(
      infoWindow: const InfoWindow(
        title: 'SPIT',
      ),
      markerId: const MarkerId('SPIT'),
      position: source,
      icon: BitmapDescriptor.defaultMarkerWithHue(
        BitmapDescriptor.hueRed,
      ),
    );
    mapMarker.add(marker);
    // markersFromStorage();
  }

  @override
  void dispose() {
    positionStream.cancel();
    _controller = Completer();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white.withOpacity(0.4),
        title: const Text("Map"),
        centerTitle: true,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(
            bottom: Radius.circular(6),
          ),
        ),
      ),
      extendBodyBehindAppBar: true,
      body: GoogleMap(
        markers: mapMarker,
        mapToolbarEnabled: false,
        myLocationEnabled: true,
        compassEnabled: false,
        myLocationButtonEnabled: false,
        onMapCreated: (controller) {
          _controller.complete(controller);
          controller.setMapStyle(
            mapStyleDark,
          );
          // setState(() {
          //   mapTopPadding = 30;
          // });
          Future.delayed(
            const Duration(seconds: 1),
            () async {
              await controller.animateCamera(
                CameraUpdate.newCameraPosition(
                  const CameraPosition(
                    target: LatLng(19.123089, 72.836084),
                    zoom: 12,
                    tilt: 30,
                    // bearing: 90,
                  ),
                ),
              );
            },
          );
        },
        trafficEnabled: true,
        zoomControlsEnabled: false,
        mapType: MapType.normal,
        initialCameraPosition: const CameraPosition(
          target: source,
          zoom: 9.25,
          // bearing: -25,
        ),
      ),
    );
  }
}
//test function to add markers

void currentLocation() async {
  final GoogleMapController controller = await _controller.future;
  try {
    Position position = await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.best,
    );
    controller.animateCamera(
      CameraUpdate.newCameraPosition(
        CameraPosition(
          target: LatLng(position.latitude, position.longitude),
          zoom: 16.13,
          tilt: 30,
          bearing: 90,
        ),
      ),
    );
  } catch (e) {
    print(e);
  }
}
