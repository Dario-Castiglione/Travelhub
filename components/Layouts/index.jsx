
import Footer from "../Footer";

import SideMenu from "../SideMenu";
export default function Layout({ children }) {
    return (
      <>
        
        <SideMenu />
        {children}
        <Footer />
      </>
    )
  }