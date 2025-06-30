import { AlluShopLogo } from '../logo/allushop-logo';

export function MainFooter() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center">
          <div className="mb-2">
            <AlluShopLogo size="2xl" />
          </div>
          <div className="text-gray-400 text-sm">
            <p>© 2025 allushop™. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
