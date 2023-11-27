import Header from "./Header";
import Sidebar from "./Sidebar";
import MiniSidebar from "./MiniSidebar";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@/reducers/sidebarSlice";
import useMainResponsive from "@/hooks/useMainResponsive";

const Layout = ({ children }) => {
  useMainResponsive();
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const showSidebars = useSelector(
    (state) => state.sidebarVisibility.showSidebars
  );
  const dispatch = useDispatch();
  return (
    <div>
      {!showSidebars && showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      )}
      <Header toggleSidebar={() => dispatch(toggleSidebar())} />

      {showSidebars ? (
        showSidebar ? (
          <Sidebar />
        ) : (
          <MiniSidebar />
        )
      ) : (
        showSidebar && (
          <Sidebar
            absolute={true}
            toggleSidebar={() => dispatch(toggleSidebar())}
          />
        )
      )}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
