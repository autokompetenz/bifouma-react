import { useLocation, useSearchParams } from 'react-router-dom';

export default function PageTransition({ children }) {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const key = pathname + searchParams.toString();

  return (
    <div key={key} className="page-transition">
      {children}
    </div>
  );
}