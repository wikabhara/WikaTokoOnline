import { Link } from "react-router";
import { FaGem, FaShippingFast, FaShieldAlt } from "react-icons/fa";

export default function AboutUsPage() {
  return (
    <>
      <div className="bg-base-200">
        <div
          className="hero min-h-[40vh]"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1607411144164-97857cf86e1a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Tentang WikaToko</h1>
              <p className="mb-5">
                Menghadirkan produk berkualitas dengan pelayanan terbaik
                langsung untuk Anda.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Misi Kami</h2>
            <p className="text-base-content/80">
              Di WikaToko, misi kami adalah memberikan pengalaman belanja online
              yang mudah, aman, dan menyenangkan. Kami berkomitmen untuk
              menyediakan produk-produk pilihan dengan kualitas terjamin serta
              layanan pelanggan yang responsif dan siap membantu kapan pun Anda
              butuhkan.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Kenapa Memilih Kami?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card bg-base-100 shadow-lg text-center">
                <div className="card-body items-center">
                  <FaGem className="text-primary mb-4" size={48} />
                  <h3 className="card-title">Kualitas Terbaik</h3>
                  <p>
                    Kami hanya memilih produk dari pemasok terpercaya untuk
                    memastikan kualitas terbaik sampai di tangan Anda.
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg text-center">
                <div className="card-body items-center">
                  <FaShippingFast className="text-primary mb-4" size={48} />
                  <h3 className="card-title">Pengiriman Cepat</h3>
                  <p>
                    Proses pengemasan dan pengiriman kami optimalkan agar
                    pesanan Anda tiba lebih cepat dari yang diharapkan.
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg text-center">
                <div className="card-body items-center">
                  <FaShieldAlt className="text-primary mb-4" size={48} />
                  <h3 className="card-title">Garansi Aman</h3>
                  <p>
                    Setiap transaksi dijamin aman. Kami juga menyediakan garansi
                    untuk produk-produk tertentu sesuai syarat.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Siap untuk Berbelanja?</h2>
            <p className="max-w-xl mx-auto mb-6 text-base-content/80">
              Jelajahi koleksi produk kami dan temukan apa yang Anda cari hari
              ini.
            </p>
            <Link to="/" className="btn btn-primary btn-lg">
              Mulai Belanja
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
