<template>
  <Navbar/>
  <div class="m-5 flex flex-col items-center justify-center gap-5">
    <div
      class="block p-6 lg:w-1/2 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Nama</th>
              <th scope="col" class="px-6 py-3">NRP</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b dark:bg-gray-800 dark:border-gray-700"
              v-for="(item, index) in asist"
              :key="index"
            >
              <td class="text-left px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ item.name }}
              </td>
              <td class="text-left px-6 py-4">{{ item.nrp }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="mtt-team">
              <div style="display: flex; flex-direction: row; justify-content: center; gap: 10vh; ">
                
                      <div class="foto" style="display: flex; flex-direction: column;">
                          <div class="foto-orang">
                            <img class="foto-anggota"  src="@/assets/arka.png">
                          </div>
                          <div class="foto-nama">
                            <div class="foto-sebutan" style="color:rgba(255, 255, 255, 1) ;">
                                Areuka
                            </div>
                            <div class="foto-lengkap" style="color: rgba(163, 163, 163, 1);">
                              M. Arkananta Radithya
                            </div>

                          </div>
                         
                      </div>
                          
                      <div class="foto" style="display: flex; flex-direction: column;">
                          <div class="foto-orang">
                            <img class="foto-anggota"  src="@/assets/imam_kecil.jpg">
                          </div>
                          <div class="foto-nama">
                            <div class="foto-sebutan" style="color:rgba(255, 255, 255, 1) ;">
                                Klunting
                            </div>
                            <div class="foto-lengkap" style="color: rgba(163, 163, 163, 1);">
                                Imam Nurhadi
                            </div>

                          </div>
                         
                      </div>
                          
                      <div class="foto" style="display: flex; flex-direction: column;">
                          <div class="foto-orang">
                            <img class="foto-anggota"  src="../assets/">
                          </div>
                          <div class="foto-nama">
                            <div class="foto-sebutan" style="color:rgba(255, 255, 255, 1) ;">
                                Azka
                            </div>
                            <div class="foto-lengkap" style="color: rgba(163, 163, 163, 1);">
                              Nur Azka Rahadiansyah
                            </div>

                          </div>
                         
                      </div>
               </div>
            </div>

</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'AboutView',
  components: {
    Navbar
  },
  data() {
    return {
      asist: [
        {
          name: 'M. Arkananta Radithya T.',
          nrp: 5027221003
        },
        {
          name: 'Imam Nurhadi',
          nrp: 5027221046
        },
        {
          name: 'Nur Azka Rahadiansyah',
          nrp: 5027221064
        },
      ]
    };
  }
};
</script>

<style>
 .mtt-team
    {
      display: flex;
      flex-direction: row;

      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      width: 100%;
      height: 50vh;
      justify-content: center;
      align-items: center;
    }

    .foto:hover {
  background-color: rgba(40, 40, 40, 1); /* Ganti dengan warna latar belakang yang Anda inginkan */
  /* Tambahan properti CSS lainnya jika diperlukan */
}

    .foto {
  display: flex;
  position: relative;
  flex-direction: column; /* Mengubah flex-direction menjadi column */
  background-color: rgba(25, 20, 20, 1);
  width: 30vh;
  height: 35vh;
  gap: 5vh;
  justify-content: center;
  align-items: center; /* Menambahkan align-items: center; untuk posisi vertikal */
  border-radius: 8%;
}

.foto .foto-orang {
  
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  width: 70%;
  height: 70%;
  border-radius: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
}


  .foto .foto-orang img.foto-anggota {
    margin-top: 20%;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    /* z-index: 0; Atur z-index ke nilai yang lebih rendah daripada foto-pause */
    border-radius: 8%;
  }

</style>

