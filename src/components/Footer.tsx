
import { footerSections } from '../utils/data-json';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';




export default function Footer (){

    return (
        <div className=" text-black py-8 font-montserrat mt-20 shadow-lg bg-gray-50">
           <div className="lg:flex-row flex flex-col lg:p-12 lg:m-0 m-8 lg:space-y-0 md:space-y-6 space-y-3 lg:justify-between sm:items-center sm:justify-center">
  <p className="text-2xl font-bold text-center">Investment</p>

  <div className='lg:flex lg:flex-col flex flex-row lg:space-y-3 lg:mr-20 mx-auto'>
    <p className='lg:text-lg font-semibold'>Follow Us :</p>
  <div className="flex items-center justify-center lg:space-x-6 space-x-3 lg:px-0 px-3">
    <a href="#" className='hover:text-gray-400'>
      <FaFacebookF size={20} />
    </a>
    <a href="#" className='hover:text-gray-400'>
      <FaTwitter size={20} />
    </a>
    <a href="#" className='hover:text-gray-400'>
      <FaInstagram size={20} />
    </a>
    <a href="#" className='hover:text-gray-400'>
      <FaYoutube size={20} />
    </a>
    <a href="#" className='hover:text-gray-400'>
      <FaTiktok size={20} />
    </a>
  </div>
</div>
</div>
      <div className=" container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {footerSections.map((section, index) => (
          <div key={index}>
            
            <h3 className="text-lg font-semibold mb-4">{section.header}</h3>
           
            <ul className="space-y-2">
              {section.links.map((link, idx) => (
                <li key={idx} className="hover:underline">
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
            
          </div>
        ))}
        
      </div>
      
         <div className="flex justify-between items-center text-center mt-8 text-sm text-black px-12">
        <p className="mt-4">© {new Date().getFullYear()} Investment. All rights reserved.</p>
         </div>
    </div>
    )
}