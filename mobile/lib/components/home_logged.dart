import 'dart:convert';

import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:get/get_core/get_core.dart';
import 'package:get/get_navigation/get_navigation.dart';
import 'package:get_storage/get_storage.dart';
// import 'package:mapbox_maps_flutter/mapbox_maps_flutter.dart';
import 'package:mobile/components/blogs.dart';
import 'package:mobile/components/home_logo.dart';
import 'package:mobile/components/map.dart';
import 'package:mobile/pages/login.dart';

class HomeLogged extends StatefulWidget {
  const HomeLogged({Key? key, required this.isLogged}) : super(key: key);

  final bool isLogged;

  @override
  State<HomeLogged> createState() => _HomeLoggedState();
}

class _HomeLoggedState extends State<HomeLogged> {
  var user = null;
  final box = GetStorage();

  @override
  void initState() {
    super.initState();
    user = box.read("user");
    if (user == null) {
      // box.write("isIn", 0);
    } else {
      user = jsonDecode(user);
      print("User(g): ${user["name"]}");
    }
  }



  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.only(top: 38.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            const Padding(
              padding: EdgeInsets.only(top: 8.0),
              child: HomeLogo(),
            ),
            // type writter effect saying find hope, find life
            AnimatedTextKit(
              isRepeatingAnimation: false,
              animatedTexts: [
                TypewriterAnimatedText(
                  'Find hope, find life',
                  textStyle: const TextStyle(
                      fontSize: 30.0,
                      fontWeight: FontWeight.bold,
                      fontFamily: "Raleway"),
                  speed: const Duration(milliseconds: 100),
                ),
              ],
            ),
            const SizedBox(
              height: 20,
            ),
            // NotLog1(),
            widget.isLogged ? Padding(
              padding: const EdgeInsets.only(bottom:12.0),
              child: Text("Hi ${user["name"]}!", style: TextStyle(fontSize: 20, fontFamily: "Raleway", fontWeight: FontWeight.bold),),
            ) : NotLog1(),
            Blogs(),
            MyMap(),
          ],
        ),
      ),
    );
  }
}

// Theme(
//         data: ThemeData().copyWith(dividerColor: Colors.transparent),
//         child: ExpansionTile(
//           clipBehavior: Clip.none,
//           title: const Row(
//             children: [
//               FaIcon(FontAwesomeIcons.blog),
//               SizedBox(width: 10),
//               Text("Blogs", style: TextStyle(fontSize: 20)),
//             ],
//           ),
//           shape: Border.all(color: Colors.transparent, width: 0),
//           collapsedShape: Border.all(color: Colors.transparent, width: 0),
//           children: blogs.map((blog) => BlogTile(blog: blog)).toList(),
//         ),
//       ),

class NotLog1 extends StatelessWidget {
  const NotLog1({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        ElevatedButton(
            style: ButtonStyle(
              // outlined button style
              shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(18.0),
                  side: const BorderSide(color: Colors.teal),
                ),
              ),
              shadowColor: MaterialStateProperty.all<Color>(Colors.transparent),
              overlayColor:
                  MaterialStateProperty.all<Color>(Colors.transparent),
              surfaceTintColor:
                  MaterialStateProperty.all<Color>(Colors.transparent),
              backgroundColor:
                  MaterialStateProperty.all<Color>(Colors.transparent),
              // foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
            ),
            onPressed: () {
              // Get.to(() => const Login(), transition: Transition.cupertino);
              Get.closeAllSnackbars();
              Get.snackbar("Coming Soon", "");
            },
            child: const Text("Register")),
        const SizedBox(
          width: 20,
        ),
        ElevatedButton(
            style: ButtonStyle(
              // outlined button style
              shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(18.0),
                  side: const BorderSide(color: Colors.teal),
                ),
              ),
              shadowColor: MaterialStateProperty.all<Color>(Colors.teal),
              overlayColor: MaterialStateProperty.all<Color>(Colors.teal),
              surfaceTintColor: MaterialStateProperty.all<Color>(Colors.teal),
              backgroundColor: MaterialStateProperty.all<Color>(Colors.teal),
              foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
            ),
            onPressed: () {
              Get.to(() => const Login(), transition: Transition.cupertino);
            },
            child: const Text("Login")),
      ],
    );
  }
}
