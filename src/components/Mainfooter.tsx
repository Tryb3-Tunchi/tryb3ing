import { Globe, AlertTriangle } from "lucide-react";

const MainFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="w-full mx-auto px-4">
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-gray-700">
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Vulnerability Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms and Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Trading</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Trading Platforms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Trading Tools
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Market Analysis
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Economic Calendar
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Education</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Trading Webinars
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Educational Videos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Trading Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Trading Glossary
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Client Portal
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        {/* <div className="py-8 border-b border-gray-700">
          <h4 className="font-semibold text-white mb-4">Follow us:</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div> */}

        {/* Legal Information */}
        <div className="py-8 space-y-6 text-sm">
          {/* Company Info */}
          <div className="flex items-start space-x-2">
            <Globe className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p>
              <span className="font-semibold text-white">Legal:</span> This
              website is operated by XM Global Limited with registered address
              at Suite 101, 63 Eve Street, Belize City, Belize. XM Global
              Limited, registered by the Financial Services Commission (FSC)
              under the Securities Industry Act 2021 (license number 000261/4)
              and Trading Point of Financial Instruments Limited, authorised and
              regulated by Cyprus Securities and Exchange Commission (CySEC)
              (licence number 120/10), are members of Trading Point Group.
            </p>
          </div>

          {/* Risk Warning */}
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-yellow-500" />
            <div>
              <p className="font-semibold text-white">Risk Warning:</p>
              <p>
                Our services involve a significant risk and can result in the
                loss of your invested capital. These products may not be
                suitable for everyone and you should ensure that you understand
                the risks involved. Please read and ensure you fully understand
                our Risk Disclosure.
              </p>
            </div>
          </div>

          {/* Restricted Regions */}
          <div>
            <p className="font-semibold text-white mb-2">Restricted Regions:</p>
            <p>
              XM Global Limited does not provide services for the residents of
              certain countries, such as the United States of America, Canada,
              Israel and the Islamic Republic of Iran.
            </p>
          </div>

          {/* Additional Disclaimer */}
          <div>
            <p>
              XM does not direct its website and services to any individual in
              any country in which the use of its website and services are
              prohibited by local laws or regulations. When accessing this
              website from a country in which its use may or may not be
              prohibited, it is the user's responsibility to ensure that any use
              of the website or services adhere to local laws or regulations. XM
              does not affirm that the information on its website is suitable to
              all jurisdictions.
            </p>
          </div>

          {/* Additional Notices */}
          <div className="pt-4 border-t border-gray-700">
            <p className="text-xs">
              The information on this website is not directed at residents of
              countries where its distribution, or use by, any person in any
              country or jurisdiction where such distribution or use would be
              contrary to local law or regulation.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-700 text-center text-sm">
          <p>
            © {new Date().getFullYear()} XM Global Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
