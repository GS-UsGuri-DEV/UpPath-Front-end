import { TbError404 } from 'react-icons/tb';
import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <main className="page-error" aria-labelledby="error-title">
      <section className="error-card">
        <div className="error-header">
          <div className="error-icon" aria-hidden>
            <TbError404 />
          </div>
          <h1 id="error-title" className="error-title">
            Página não encontrada
          </h1>
        </div>

        <p className="error-text">
          O link pode estar incorreto ou a página foi removida.
        </p>
        <p className="error-text">
          Verifique o endereço ou vá para a página inicial.
        </p>

        <div className="error-actions">
          <Link to="/" className="btn btn-primary">
            Ir para a Home
          </Link>
        </div>
      </section>
    </main>
  );
}
