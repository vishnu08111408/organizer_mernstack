import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:mobile/api/api.dart';
import 'package:mobile/pages/home.dart';
import 'package:rive/rive.dart';

class LoginController extends GetxController {
  TextEditingController email = TextEditingController();
  TextEditingController password = TextEditingController();
  final loginKey = GlobalKey<FormState>();
  RxBool isLoading = false.obs;
  RxBool obscureText = true.obs;

  void obscure() {
    obscureText.value = !obscureText.value;
  }

  //rive
  late SMITrigger check;
  late SMITrigger error;
  late SMITrigger reset;
  late StateMachineController? animationController;

  //rive

  @override
  void onInit() async {
    final bytes = await rootBundle.load('assets/check.riv');
    final file = RiveFile.import(bytes);
    final artboard = file.mainArtboard;
    animationController =
        StateMachineController.fromArtboard(artboard, "State Machine 1");
    check = animationController?.findSMI('Check') as SMITrigger;
    error = animationController?.findSMI('Error') as SMITrigger;
    reset = animationController?.findSMI('Reset') as SMITrigger;
    super.onInit();
  }

  void login() async {
    isLoading.value = true;
    if (!loginKey.currentState!.validate()) {
      isLoading.value = false;
      return;
    }
    try {
      final box = GetStorage();
      final fcm_token = await box.read('fcm_token');
      print(fcm_token);
      final authData = await Api().loginRequest(
          email: email.text, password: password.text, token: fcm_token);
      // print("auth data");
      // print(authData);

      box.write('isLogin', true);
      box.write(
        'user',
        jsonEncode(authData),
      );
      check.fire();
      Get.closeAllSnackbars();
      Get.snackbar(
        'Success',
        'Logged In Successfully',
        snackPosition: SnackPosition.TOP,
        backgroundColor: Colors.green.withOpacity(0.2),
        colorText: Colors.white,
      );

      await Future.delayed(
        const Duration(seconds: 2),
      );
      Get.offAll(() => const Home(), transition: Transition.fadeIn);
    } on Exception catch (e) {
      print("error: ${e}");
      error.fire();
      Get.closeAllSnackbars();
      Get.snackbar(
        'Error',
        'Please check your credentials',
        snackPosition: SnackPosition.TOP,
        backgroundColor: Colors.red.withOpacity(0.2),
        colorText: Colors.white,
      );
    } finally {
      await Future.delayed(
        const Duration(seconds: 2),
      );
      isLoading.value = false;
    }
  }
}
