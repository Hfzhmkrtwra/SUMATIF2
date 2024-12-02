import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGYnq4VKq-YGu4RbfoI_ZHez9fishYjZo",
  authDomain: "insan-cemerlang-afd2f.firebaseapp.com",
  projectId: "insan-cemerlang-afd2f",
  storageBucket: "insan-cemerlang-afd2f.appspot.com",
  messagingSenderId: "686649580589",
  appId: "1:686649580589:web:61374bbbd68adb604eaca4",
  measurementId: "G-LNZTQBCE26"
};

//inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function tambahPelanggan(nama, alamat, notelepon) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "pelanggan2"), {
      nama: nama,
      alamat: alamat,
      notelepon: notelepon
    })

    // menampilkan pesan berhasil
    console.log('berhasil menyimpan data pelanggan')
  } catch (error) {
    // menampilkan pesan gagal 
    console.log('gagal menyimpan data pelanggan' + error)
  }
}


export async function ambilDaftarPelanggan() {
  const refDokumen = collection(basisdata, "pelanggan2");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      alamat: dokumen.data().alamat,
      notelepon: dokumen.data().notelepon

    })
  })

  return hasilKueri;
}

export async function ubahPelanggan(id, namabaru, alamatbaru, noteleponbaru) {
  await updateDoc(
    doc(basisdata, "pelanggan2", id), { nama: namabaru, alamat: alamatbaru, notelepon: noteleponbaru }
  )
}

export async function hapusPelanggan(id) {
  await deleteDoc(doc(basisdata, "pelanggan2", id))
}

export async function ambilPelanggan(id) {
  const refDokumen = await doc(basisdata, "pelanggan2", id)
  const snapshotDokumen = await getDoc(refDokumen)

  return await snapshotDokumen.data()
}