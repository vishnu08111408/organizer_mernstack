import 'dart:convert';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:mobile/api/api.dart';
import 'package:mobile/components/home_logo.dart';
import 'package:mobile/components/home_logged.dart';
import 'package:mobile/pages/login.dart';
import 'package:url_launcher/url_launcher.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  late FirebaseMessaging messaging;
  RxInt where = 0.obs;
  late var user;

  void handleToken() async {
    final box = GetStorage();

     user = await box.read("user");
    if (user == null) {
      // box.write("isIn", 0);
      where.value = -1;
    }
    else {
      user = jsonDecode(user);
      where.value = 1;
    }


    // Fetch the FCM token.
    String? tokenValue;
    try {
      tokenValue = await messaging.getToken();
    } catch (e) {
      print("Error fetching FCM token: $e");
      return;
    }

    // Store the FCM token in GetStorage.
    await box.write('fcm_token', tokenValue);

    // Fetch stored token from backend.
    Map<String, dynamic>? tokenFromDB;
    try {
      tokenFromDB = await Api().getFCMtoken();
    } catch (e) {
      print("Error fetching FCM token from database: $e");
      return;
    }
    print("token value: $tokenValue");
    // If the tokens do not match, update the backend.
    if (tokenValue != null &&
        tokenFromDB != null &&
        tokenFromDB["fcm_token"] != tokenValue) {
      print("token not matching");
      try {
        final response = await Api().updateFCMRequest(token: tokenValue);
        if (response != null) {
          print("fcm updated");
        }
      } catch (e) {
        print("Error updating FCM token in database: $e");
      }
    }
  }

  _launchURL(double latitude, double longitude) async {
    final url = Uri.parse(
        "https://www.google.com/maps/dir/?api=1&destination=$latitude,$longitude");

    if (await canLaunchUrl(url)) {
      await launchUrl(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  @override
  void initState() {
    super.initState();
    messaging = FirebaseMessaging.instance;

    handleToken();
    messaging.onTokenRefresh.listen((event) {
      // print("token refresh");
      // print(event);
      // TODO: clear localstorage and ask to login again
    });

    FirebaseMessaging.onMessage.listen((RemoteMessage event) {});
    FirebaseMessaging.onMessageOpenedApp.listen((message) {
      // print('Message clicked!');
      // print(message);
      final latlng = message.data["latlng"];
      final latlngList = latlng.split(",");
      // print("latlngList: $latlngList");
      _launchURL(double.parse(latlngList[0]), double.parse(latlngList[1]));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: Obx(() {
        if (where.value == 0) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        } else if (where.value == -1) {
          return const HomeLogged(isLogged: false);
        } else {
          return const HomeLogged(isLogged: true);
        }
      }),
    );
  }
}
