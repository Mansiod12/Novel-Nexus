import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-4xl font-bold text-[#32502E] text-center mb-6">About Us</h2>
        
        <section className="text-center text-[#32502E] mb-12">
          <h3 className="text-3xl font-semibold">Our Story</h3>
          <p className="mt-4 text-lg">
            Welcome to our bookstore! It all started with a passion for books and the desire to share that passion with the world. Our mission is simple: to inspire minds, spark creativity, and bring people closer to the world of literature. We believe in the power of reading to transform lives, and our carefully curated selection of books reflects that. Join us on a journey through stories that can change the way we see the world.
          </p>
          
        </section>

        {/* Image Section */}
        <section className="text-center mb-12 ">
          <img
            src="https://www.ovvihq.com/assets/images/blogs/open-a-bookstore-coffee-shop.jpg"
            alt="Bookstore"
            className="w-full h-100 object-cover rounded-xl shadow-lg"
          />
        </section>

        {/* Our Mission Section */}
        <section className="text-center text-[#32502E]">
          <h3 className="text-3xl font-semibold">Our Mission</h3>
          <p className="mt-4 text-lg">
            At our bookstore, we strive to make every book a gateway to new experiences, new ideas, and new worlds. Whether you're looking for a gripping novel, insightful non-fiction, or the latest bestseller, our goal is to help you find a book that will inspire, entertain, and leave a lasting impact. Join us in celebrating the joy of reading!
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
