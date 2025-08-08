import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaRegSmileBeam,
} from "react-icons/fa";

export default function ContactPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Terima kasih atas pesan Anda!");
  };

  return (
    <>
      <div className="p-4 md:p-8 lg:p-12 bg-base-200 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="py-4 flex justify-center">
              Punya pertanyaan atau masukan? Simpan dalam hati ya...
              <FaRegSmileBeam />
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title">Informasi Kontak</h2>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-primary" size={20} />
                  <span>Jl. Gang Buntu No. 666, Surabaya</span>
                </div>
                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-primary" size={20} />
                  <span>masalahmu@wikatoko.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <FaPhone className="text-primary" size={20} />
                  <span>(031) 666-5858</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nama Anda</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan nama"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email Anda</span>
                  </label>
                  <input
                    type="email"
                    placeholder="contoh@email.com"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="flex flex-col form-control">
                  <label className="label">
                    <span className="label-text">Pesan Anda</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    placeholder="Tulis pesan Anda di sini..."
                    required
                  ></textarea>
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Kirim Pesan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
