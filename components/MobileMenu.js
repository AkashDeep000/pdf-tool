export default function MobileMenu({ setMenu }) {
  return (
    <>
      <nav className="mainNav">
        <div className="mainNavHeader">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="6rem" height="1.5rem"
            
            fill="url(#grad1)"
            viewBox="150, 0, 110,100" 
            dangerouslySetInnerHTML={{ __html: '<use xlink:href="#logo"/>' }}
          />
          <p onClick={() => setMenu(false)}>×</p>
        </div>
        <ul className="mainNavList">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </nav>
    </>
  );
}
