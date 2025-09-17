import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:mobile/api/api.dart';
import 'package:mobile/components/fullMap.dart';

class MyMap extends StatefulWidget {
  const MyMap({super.key});

  @override
  State<MyMap> createState() => _MyMapState();
}

class _MyMapState extends State<MyMap> {

  final hospitals = [].obs;



  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical:16.0),
      child: Card(
    margin: const EdgeInsets.symmetric(horizontal: 15),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(32),
          side: const BorderSide(
            color: Colors.blueGrey,
            width: 2,
            style: BorderStyle.solid,
          ),
        ),
        child: TextButton(
          onPressed: () {
            Navigator.push(
              context,
              CupertinoPageRoute(builder: (context) => const MapWidget()),
            );
          },
          child: const SizedBox(
            width: double.infinity,
            child: Padding(
              padding: EdgeInsets.all(5.0),
              child: Row(
                children: [
                  FaIcon(FontAwesomeIcons.hospital),
                  SizedBox(width: 10),
                  Text(
                    "Nearby Hospitals",
                    style: TextStyle(fontSize: 20),
                  ),
                  Spacer(),
                  FaIcon(FontAwesomeIcons.arrowRight)
                ],
              ),
            ),
          ),
          )
      ),
    );
  }
}
