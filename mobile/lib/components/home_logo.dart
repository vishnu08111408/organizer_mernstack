
import 'package:flutter/material.dart';

class HomeLogo extends StatefulWidget {
  const HomeLogo({super.key});

  @override
  State<HomeLogo> createState() => _HomeLogoState();
}

class _HomeLogoState extends State<HomeLogo> {
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Image.asset(
          'assets/organ.png',
          width: 50,
        ),
        const SizedBox(
          width: 20,
        ),
        const Text(
          'ORGANizer',
          style: TextStyle(
            fontSize: 30,
            fontWeight: FontWeight.bold,
            fontFamily: "Raleway"
          ),
        ),
      ],
    );
  }
}