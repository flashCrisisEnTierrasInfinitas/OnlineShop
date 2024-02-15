import { CSpinner } from "@coreui/react";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import Progres from "./progres";

export default function Pay({ Total, setTotal, Seccion, addShop, setAddShop }) {
  var token = Cookies.get("token");
  const [loading, setLoading] = useState(false);
  return (
    <div className="top-20">
      <Progres />
      <section class="py-16 bg-gray-100">
        <div class="max-w-6xl px-4 mx-auto">
          <div class="rounded-lg shadow bg-gray-50 dark:border-gray-900">
            <div class="p-6 ">
              <div class="pb-6 border-b border-gray-100">
                <h2 class="text-xl font-bold text-gray-800 md:text-3xl dark:text-gray-300">
                  Metodo de Pago
                </h2>
              </div>
              <div class="py-6 border-b border-gray-100">
                <div class="w-full md:w-10/12">
                  <div class="flex flex-wrap mb-2 -m-3">
                    <div class="w-full p-3 md:flex-1">
                      <p class="mb-1.5 font-medium text-base text-gray-800 dark:text-gray-400">
                        Usuario
                      </p>
                      <input
                        class="w-full  dark:border-gray-800 px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                        type="text"
                        value={Seccion}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-10/12">
                  <div class="flex flex-wrap mb-2 -m-3">
                    <div class="w-full p-3 md:flex-1">
                      <p class="mb-1.5 font-medium text-base text-gray-800 dark:text-gray-400">
                        Direccion
                      </p>
                      <input
                        class="w-full  dark:border-gray-800 px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                        type="text"
                        value={Seccion}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-10/12">
                  <div class="flex flex-wrap mb-2 -m-3">
                    <div class="w-full p-3 md:flex-1">
                      <p class="mb-1.5 font-medium text-base text-gray-800 dark:text-gray-400">
                        Tipo de Entrega
                      </p>
                      <input
                        class="w-full  dark:border-gray-800 px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                        type="text"
                        value="envio"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="py-6 border-b border-gray-100">
                <div class="w-full md:w-10/12">
                  <div class="flex flex-wrap mb-2 -m-3">
                    <div class="w-full p-3 md:w-1/3">
                      <p class="text-sm font-semibold text-gray-800 dark:text-gray-400">
                        Card details
                      </p>
                    </div>
                    <div class="w-full p-3 md:flex-1">
                      <p class="mb-1.5 font-medium text-base text-gray-800 dark:text-gray-400">
                        Card Number
                      </p>
                      <div class="flex items-center overflow-hidden border border-gray-200 rounded-lg dark:text-gray-400 dark:border-gray-800 focus-within:border-blue-500 ">
                        <div class="flex-shrink-0 pl-3.5 pr-2">
                          <img
                            src="https://i.postimg.cc/YCDxyJ3c/download-removebg-preview-1.png"
                            alt=""
                            class="object-contain w-7 h-7"
                          />
                        </div>
                        <input
                          class="w-full pr-4 py-2.5 text-base dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400 text-gray-900 font-normal outline-none"
                          type="text"
                          placeholder="1283960lk0887ad"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex pt-6 flex-wrap -m-1.5">
                <Button
                  style={{
                    background: "#FF6333",
                    width: "100%",
                    color: "#fff",
                  }}
                >
                  {loading ? (
                    <div className="progess">
                      <CSpinner
                        color="light"
                        size="sm"
                        style={{ width: "1rem", height: "1rem" }}
                      />
                    </div>
                  ) : (
                    "finalizar compra"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
