import 'dart:convert';

import 'package:dio/dio.dart';
// import 'dart:math';

import 'package:flutter/foundation.dart';
import 'package:get_storage/get_storage.dart';

class Api {
  final Dio _dio = Dio();

  final box =
      GetStorage(); // This assumes you've already initialized GetStorage in your app

  Api() {
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest:
          (RequestOptions options, RequestInterceptorHandler handler) async {
        var user = box.read('user');
        user = user != null ? jsonDecode(user) : null;
        if (user != null) {
          // print("user token2: ${user['token']}");
          options.headers['Authorization'] = 'Bearer ${user['token']}';
        }
        return handler.next(options);
      },
    ));
  }

  // static var baseURL = "http://127.0.0.1:5000/";
  // static var baseURL = "http://10.0.2.2:5000/api/";
  static var baseURL = "https://organizer-server-uek2.onrender.com/api/";

  // endpoints:
  // static final storiesCount = "${baseURL}get_story_count";
  static final login = "${baseURL}receiver/mlogin";
  static final getupdateFCM = "${baseURL}receiver/fcmtoken";
  static final allhospitals = "${baseURL}hospital";

  void setBaseURL(String url) {
    baseURL = url;
  }

  Future<Map<String, dynamic>> loginRequest(
      {required String email,
      required String password,
      required String token}) async {
    try {
      final response = await _dio.post(
        login,
        data: {'email': email, 'password': password, 'fcm_token': token},
      );
      // print("login resp: ${response.data}");
      return response.data;
    } catch (e) {
      if (kDebugMode) print("login err: $e");
      // return {}; // You can handle error cases as needed
      throw Exception(e);
    }
  }

  Future<Map<String, dynamic>> updateFCMRequest({required String token}) async {
    try {
      final response = await _dio.post(
        getupdateFCM,
        data: {'fcm_token': token},
      );
      // print("login resp: ${response.data}");
      return response.data;
    } catch (e) {
      if (kDebugMode) print("login err: $e");
      // return {}; // You can handle error cases as needed
      throw Exception(e);
    }
  }

  Future<Map<String, dynamic>> getFCMtoken() async {
    try {
      final response = await _dio.get(
        getupdateFCM,
      );
      print("resp: ${response.data}");
      return response.data;
    } catch (e) {
      if (kDebugMode) print("login err: $e");
      // return {}; // You can handle error cases as needed
      throw Exception(e);
    }
  }

  Future<List<dynamic>> getHospitals() async {
    try {
      final response = await _dio.get(
        allhospitals,
      );
      // print("login resp: ${response.data}");
      return response.data;
    } catch (e) {
      if (kDebugMode) print("login err: $e");
      // return {}; // You can handle error cases as needed
      throw Exception(e);
    }
  }
}
