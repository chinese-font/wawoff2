FROM emscripten/emsdk:3.1.46

RUN git clone --recursive https://github.com/google/woff2.git
RUN cd woff2 && \
    git checkout 0f4d304faa1c62994536dc73510305c7357da8d4 && \
    cd brotli && \
    git checkout 9b83be233e0ec867d91bcd451717c881eaf35ca2 && cd ..


RUN mkdir -p /src/build/brotli-wasm && \
    cd /src/build/brotli-wasm && \
    emcmake cmake /src/woff2/brotli -DCMAKE_BUILD_TYPE=Release && \
    emmake make -j4

RUN mkdir -p /src/build/brotli-native && \
    cd /src/build/brotli-native && \
    cmake /src/woff2/brotli -DCMAKE_BUILD_TYPE=Release && \
    make -j4

RUN mkdir -p /src/build/woff2-wasm && \
    cd /src/build/woff2-wasm && \
    emcmake cmake /src/woff2  \
      -DCMAKE_BUILD_TYPE=Release \
      -DNOISY_LOGGING=OFF \
      -DBROTLIENC_INCLUDE_DIRS=/src/woff2/brotli/c/include/ \
      -DBROTLIDEC_INCLUDE_DIRS=/src/woff2/brotli/c/include/ \
      -DBROTLIENC_LIBRARIES=/src/build/brotli-wasm/libbrotlienc.a \
      -DBROTLIDEC_LIBRARIES=/src/build/brotli-wasm/libbrotlidec.a \
      && \
    emmake make -j4 woff2enc woff2dec

RUN mkdir -p /src/build/woff2-native && \
    cd /src/build/woff2-native && \
    cmake /src/woff2 \
      -DCMAKE_BUILD_TYPE=Release \
      -DBROTLIDEC_INCLUDE_DIRS=/src/woff2/brotli/c/include/ \
      -DBROTLIENC_INCLUDE_DIRS=/src/woff2/brotli/c/include/ \
      -DBROTLIDEC_LIBRARIES=/src/build/brotli-native/libbrotlidec.so \
      -DBROTLIENC_LIBRARIES=/src/build/brotli-native/libbrotlienc.so \
      && \
    make -j4 woff2_compress woff2_decompress
