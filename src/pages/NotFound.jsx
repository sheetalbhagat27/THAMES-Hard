import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
export default function NotFound() {
  return (<section className="page-hero"><div className="container">
    <SEO title="Page Not Found" description="The page you are looking for could not be found." />
    <h1>Page not found</h1><p>The page you requested does not exist.</p>
    <Link className="btn btn-gold" to="/">Back to Home</Link></div></section>);
}
