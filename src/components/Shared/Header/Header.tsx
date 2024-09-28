import './Header.css';

function Header() {
    return (
        <header className="header">
        <h1>SmartFace</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/carts">Carrinhos</a></li>
          </ul>
        </nav>
      </header>
    )
}
export default Header

