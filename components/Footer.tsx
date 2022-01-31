function Footer() {
  return (
    <footer className="text-gray-100 bg-gray-500 border-t ">
      <div className="flex items-center justify-between py-5 mx-20 border-b">
        <div>
          <p className="text-2xl font-extrabold">Teach the world online</p>
          <p className="text-md">Create an online video course, reach students across the globe, and earn money</p>
        </div>
        <div>
          <a className="p-3 font-bold border border-gray-400 cursor-pointer">Teach on Coursemy</a>
        </div>
      </div>
      <div className="grid grid-cols-2 py-5 mx-20">
        <div className="grid grid-cols-3 text-xs">
          <div className="space-y-2 cursor-pointer">
            <div>
              <a>Coursemy Business</a>
            </div>
            <div>
              <a>Teach on Coursemy</a>
            </div>
            <div>
              <a>Get the app</a>
            </div>
            <div>
              <a>About us</a>
            </div>
            <div>
              <a>Contact us</a>
            </div>
          </div>
          <div className="space-y-2 cursor-pointer">
            <div>
              <a>Careers</a>
            </div>
            <div>
              <a>Blog</a>
            </div>
            <div>
              <a>Help and Support</a>
            </div>
            <div>
              <a>Affiliate</a>
            </div>
            <div>
              <a>Investors</a>
            </div>
          </div>
          <div className="space-y-2 cursor-pointer">
            <div>
              <a>Terms</a>
            </div>
            <div>
              <a>Privacy policy</a>
            </div>
            <div>
              <a>Cookie settings</a>
            </div>
            <div>
              <a>Sitemap</a>
            </div>
            <div>
              <a>Accessibility statement</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
