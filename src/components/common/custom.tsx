import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import "swiper/css";
import "swiper/css/pagination";
import Modal from "react-modal";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const     Custom: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [gifs, setGifs] = useState<string[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState<any>(null);
  const [elements, setElements] = useState<any[]>([]);
  const [images, setImages] = useState<string[]>([
    "https://groupleavingcards.com/assets/design/617318f94c962c605abdeabb.jpg",
    "https://groupleavingcards.com/assets/design/66bd382d51e4bce9bdd31fc6_sm.avif",
    "https://groupleavingcards.com/assets/design/66e30136ffa5cb04d55d990e_sm.avif",
    "https://groupleavingcards.com/assets/design/6734d2bbe8c991dba26a0288_sm.webp",
    "https://groupleavingcards.com/assets/design/66967675b0d2b479aa568c98_sm.avif",
    "https://groupleavingcards.com/assets/design/66d88499b4fb75024aa2d8de_sm.avif",
  ]);

  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Restore elements from localStorage on initial render
  useEffect(() => {
    const storedElements = localStorage.getItem("slideElements");
    if (storedElements) {
      setElements(JSON.parse(storedElements));
    }
  }, []);

  // Update localStorage whenever elements change
  useEffect(() => {
    if (elements.length > 0) {
      localStorage.setItem("slideElements", JSON.stringify(elements));
    }
  }, [elements]);

  const handleAddMessageClick = () => {
    setShowModal(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleSaveMessage = () => {
    if (activeSlideIndex === null) {
      alert("No active slide selected!");
      return;
    }

    const newMessage = {
      type: "text",
      content: messageInputRef.current?.value || "Default message",
      slideIndex: activeSlideIndex + 2,
      x: 0,
      y: 0,
    };

    setElements([...elements, newMessage]);
    setShowModal(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (activeSlideIndex !== null) {
          const newImage = {
            type: "image",
            content: reader.result as string,
            slideIndex: activeSlideIndex + 2,
            x: 0,
            y: 0,
          };

          setElements([...elements, newImage]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchGifs = async (term: string) => {
    try {
      const response = await axios.get(
        "https://tenor.googleapis.com/v2/search",
        {
          params: {
            q: term || "wave",
            key: "AIzaSyBphMbpVXm8Rc9CnWX7W3LuePqIHgSWoDo",
            client_key: "my_test_app",
            limit: 100,
            locale: "en_US",
          },
        }
      );

      setGifs(
        response.data.results.map((result: any) => result.media_formats.gif.url)
      );
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm) fetchGifs(searchTerm);
  };

  const openModal = () => {
    setIsOpen(true);
    fetchGifs("trending");
  };

  // Add a new page when the button is clicked
  const handleAddPage = () => {
    setImages([
      ...images,
      "https://example.com/new-page-image.jpg", // Placeholder for the new page (or add any image URL here)
    ]);
  };
 const fetchImageAsBase64 = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl, { mode: "cors" });
    const blob = await response.blob();

    // Convert AVIF to PNG using OffscreenCanvas
    if (blob.type === "image/avif") {
      const imageBitmap = await createImageBitmap(blob);
      const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(imageBitmap, 0, 0);
      return canvas.convertToBlob({ type: "image/png" }).then((pngBlob) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(pngBlob);
        });
      });
    }

    // Convert non-AVIF images to Base64
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

// Function to generate and download the PDF
const handleDownloadPDF = async () => {
  const pdf = new jsPDF("p", "mm", "a4"); // A4 PDF in portrait mode
  const slideWidth = 210; // A4 width in mm
  const slideHeight = 297; // A4 height in mm

  for (let i = 0; i < images.length; i++) {
    const base64Image = await fetchImageAsBase64(images[i]);

    if (!base64Image) continue; // Skip if image fails

    if (i !== 0) pdf.addPage(); // Add a new page for each slide

    // Add slide background image to PDF
    pdf.addImage(base64Image, "JPEG", 10, 10, slideWidth - 20, slideHeight / 2);

    // Overlay elements at correct positions
    elements.forEach((el) => {
      if (el.slideIndex === i + 1) {
        if (el.type === "text") {
          pdf.setFontSize(14);
          pdf.setTextColor(0, 0, 255); // Blue text
          pdf.text(el.content, 10 + el.x, slideHeight / 2 + 20 + el.y);
        } else if (el.type === "image" || el.type === "gif") {
          pdf.addImage(
            el.content,
            "JPEG",
            10 + el.x,
            slideHeight / 2 + 20 + el.y,
            50,
            50
          ); // Image size 50x50
        }
      }
    });

    // Show element positions in PDF
    elements.forEach((el) => {
      if (el.slideIndex === i + 1) {
        pdf.setFontSize(10);
        pdf.setTextColor(255, 0, 0); // Red for positions
        pdf.text(
          `(${el.x}, ${el.y})`,
          10 + el.x,
          slideHeight / 2 + 40 + el.y
        );
      }
    });
  }

  pdf.save("slides_with_positions.pdf"); // Download PDF
};
  
  
  return (
    <div style={styles.container}>
      {/* <button style={styles.button} onClick={handleAddMessageClick}>
        Add Message
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ marginBottom: "10px" }}
      />

      

      <button
        onClick={openModal}
        className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
        >
        Add Gif
      </button>
      <button
        onClick={handleAddPage} 
        className="px-4 py-2 bg-black border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
        style={{color:"white"}}
        >
       +
      </button> */}

      <div className="editor_option" style={{marginBottom:"15px"}}>
      <div>
          <button
          className="add_btn"
          onClick={handleAddMessageClick}
            style={{
              padding: "10px",
              // backgroundColor: "#28a745",
              // color: "white",
              border: "none",
              borderRadius: "50px",
            }}
          >
            Add Message
          </button>

        
        </div>
        {/* Image Upload */}
        <div className="search_input">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            // multiple
          />
          <div className="upload_svg">
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mus-vubbuv"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="AddPhotoAlternateIcon"
            >
              <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8zM5 19l3-4 2 3 3-4 4 5z"></path>
            </svg>
          </div>
        </div>
        <div className="search_input"   onClick={openModal}>
          {/* <input
            type="file"
            accept="image/*"
            // onChange={(e) => handleMediaUpload(e.target.files!, "image")}
            multiple
          /> */}
          <div className="upload_svg">
          <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mus-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="GifIcon"><path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1m10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path></svg>
          </div>
        </div>
        <div>
    
    </div>
        {/* GIFs and Stickers Search */}
        {/* <div className="text_design">
         
           <input
        type="text"
        value={searchTerm1}
        onChange={handleSearchChange}
        placeholder="Search for a GIF"
        style={{ padding: '10px', margin: '10px 0' }}
      />
      <button onClick={openModal1} style={{ padding: '10px' }}>
        Search
      </button>

  

        </div> */}

       

        {/* Add Text Section */}
        {/* <div>
          <button
            onClick={handleButtonClick}
            style={{
              padding: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Add Text
          </button>

        
        </div> */}

        {/* Add to Cart Button */}
      
        <div style={{ textAlign: "center" }}>
        <button
        onClick={handleAddPage} // Add page functionality
        className="px-4 py-2 add_btn border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
        style={{color:"white", marginLeft:"40px", borderRadius: "70px",}}
        >
       +
      </button>
        </div>
        <div style={{ textAlign: "center" }}>
        <button
         onClick={handleDownloadPDF}
        className="px-4 py-2 add_btn border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
        style={{color:"white", marginLeft:"20px", borderRadius: "70px",}}
        >
      Download
      </button>
        </div>
        {/* <div style={{ textAlign: "center" }}>
          <button
            // onClick={showCard}
            className="add_btn"

              style={{
                // padding: "10px 20px",
                // backgroundColor: "#007bff",
                // color: "white",
                // border: "none",
                borderRadius: "40px",
              }}
          >
           Show Card
          </button>
        </div> */}
      </div>
        {/* </div> */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <textarea
              ref={messageInputRef}
              style={styles.textarea}
              rows={5}
            ></textarea>
            <button style={styles.button} onClick={handleSaveMessage}>
              Save
            </button>
          </div>
        </div>
      )}

     <div className="swiperSlider">
     <Swiper
        spaceBetween={30}
        slidesPerView={3}
        onSlideChange={({ activeIndex }) => setActiveSlideIndex(activeIndex)}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            style={{
              ...styles.swiperSlide,
              ...(activeSlideIndex + 1 === index
                ? {
                    transform: "scale(1.2288)",
                    backgroundColor: "#000000",
                    zIndex: 9,
                    // width: "fit-content",  
                    height: "400px"
                  }
                : {}),
            }}
          >
            <div style={styles.slideWrapper}>
              <img
                src={image}
                alt={`slide-${index}`}
                style={{ width: "fit-content", height: "400px",background: "white" }}
              />
              {elements
                .filter((el) => el.slideIndex === index + 1)
                .map((el, i) => (
                  <DraggableElement
                    key={i}
                    content={el.content}
                    type={el.type}
                    index={i}
                    setElements={setElements}
                    initialX={el.x || 0}
                    initialY={el.y || 0}
                  />
                ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper></div> 

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="p-4 bg-white rounded-lg shadow-lg max-w-xl mx-auto"
      >
        <h2 className="text-lg font-bold mb-4">Select a GIF</h2>
        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Search GIFs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-black border rounded-md hover:bg-blue-700 transition"
          >       
            Search
          </button>
        </form>
        <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-96">
          {gifs.map((gifUrl, index) => (
            <img
              key={index}
              src={gifUrl}
              alt="GIF"
              style={{ width: "80%", height: "80%" }}
              className="rounded-lg cursor-pointer"
              onClick={() => {
                setElements((prev) => [
                  ...prev,
                  { type: "gif", content: gifUrl, slideIndex: activeSlideIndex + 2, x: 0, y: 0 },
                ]);
                closeModal();
              }}
            />
          ))}
        </div>
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

const DraggableElement = ({
  content,
  type,
  index,
  setElements,
  initialX,
  initialY,
}: {
  content: string;
  type: string;
  index: number;
  setElements: React.Dispatch<React.SetStateAction<any[]>>;
  initialX: number;
  initialY: number;
}) => {
  const [{ x, y }, api] = useSpring(() => ({ x: initialX, y: initialY }));

  const bind = useDrag((state: any) => {
    const [newX, newY] = state.offset;

    api.start({ x: newX, y: newY });

    setElements((prevElements) => {
      const updatedElements = [...prevElements];
      updatedElements[index] = {
        ...updatedElements[index],
        x: newX,
        y: newY,
      };
      localStorage.setItem("slideElements", JSON.stringify(updatedElements)); // Persist updated state
      return updatedElements;
    });
  });

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        position: "absolute",
        cursor: "move",
        zIndex: 10,
        color: "rgb(17, 17, 17)",
        left: "0px",
        right: "0px",
        top: "50%",
        transform: "translate3d(0px, 12px, 0px)",
      }}
    >
      {type === "image" || type === "gif" ? (
        <img
          src={content}
          alt="uploaded"
          style={{ width: "100px", height: "100px" }}
        />
      ) : (
        content
      )}
    </animated.div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Helvetica, Arial, sans-serif",
    backgroundColor: "#eee",
    minHeight: "100vh",
    gap:"10px"
  } as React.CSSProperties,
  button: {
    margin: "10px",
    padding: "10px 15px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  } as React.CSSProperties,
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as React.CSSProperties,
  modal: {
    background: "#fff",
    padding: "20px",
    border: "1px solid #ccc",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
  } as React.CSSProperties,
  textarea: {
    width: "100%",
    marginBottom: "10px",
    fontSize: "14px",
    padding: "5px",
  } as React.CSSProperties,
  swiperSlide: {
    textAlign: "center",
    fontSize: "18px",
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "500px",
    overflow: "hidden",
  } as React.CSSProperties,
  slideWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  } as React.CSSProperties,
};

export default Custom;
