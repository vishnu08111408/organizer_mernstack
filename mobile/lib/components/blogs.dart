import 'package:flutter/material.dart';

import 'package:font_awesome_flutter/font_awesome_flutter.dart';


class Blogs extends StatelessWidget {
  final List<Blog> blogs = [
    Blog(
      title: "The Process of Organ Transplantation",
      content:
          "Organ transplantation is a medical marvel. It involves removing a functional organ from one person and transplanting it into another whose organ has failed. The procedure, though complicated, has saved numerous lives. Proper screening of donors is vital to ensure compatibility and reduce rejection chances.",
    ),
    Blog(
      title: "The Importance of Organ Donation",
      content:
          "Organ donation is a selfless act that can save lives. Every year, countless individuals await a life-saving transplant. Donating organs posthumously means giving the gift of life to someone even after we're gone. It's a legacy of hope and love.",
    ),
    Blog(
      title: "Advances in Transplantation Techniques",
      content:
          "With technology progressing rapidly, transplantation techniques have seen significant advances. Improved immunosuppressant drugs ensure better organ acceptance, while 3D printing holds promise for creating bio-compatible organs in the future.",
    ),
    Blog(
      title: "Challenges in Post-Transplant Care",
      content:
          "After transplantation, the journey isn't over. Patients must regularly take medications to prevent organ rejection. They also need frequent check-ups to ensure the transplanted organ is functioning correctly. It's a lifelong commitment to health.",
    ),
  ];

  Blogs({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 15),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(32),
        side: const BorderSide(
          color: Colors.blueGrey,
          width: 2,
          style: BorderStyle.solid,
        ),
      ),
      child: Theme(
        data: ThemeData().copyWith(dividerColor: Colors.transparent),
        child: ExpansionTile(
          clipBehavior: Clip.none,
          title: const Row(
            children: [
              FaIcon(FontAwesomeIcons.blog),
              SizedBox(width: 10),
              Text("Blogs", style: TextStyle(fontSize: 20)),
            ],
          ),
          shape: Border.all(color: Colors.transparent, width: 0),
          collapsedShape: Border.all(color: Colors.transparent, width: 0),
          children: blogs.map((blog) => BlogTile(blog: blog)).toList(),
        ),
      ),
    );
  }
}

class BlogTile extends StatelessWidget {
  final Blog blog;

  const BlogTile({super.key, required this.blog});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: Colors.teal.shade100,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            spreadRadius: 1,
            blurRadius: 3,
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            blog.title,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 10),
          Text(blog.content),
        ],
      ),
    );
  }
}

class Blog {
  final String title;
  final String content;

  Blog({required this.title, required this.content});
}