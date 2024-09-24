import "../style/Invoice.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import numberToWords from "number-to-words";

const Invoice = () => {
  const location = useLocation();
  const { selectedPlants } = location.state || { selectedPlants: [] };

  // State to hold the input values for quantity, rate, bill, and date
  const [plantData, setPlantData] = useState(
    selectedPlants.map(plant => ({ ...plant, quantity: "", rate: "", amount: 0 }))
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const [billNo, setBillNo] = useState(""); // State for Bill No
  const [invoiceDate, setInvoiceDate] = useState(""); // State for Date

  const invoiceRef = useRef();

  useEffect(() => {
    const total = plantData.reduce((acc, plant) => {
      const amount = plant.quantity && plant.rate ? plant.quantity * plant.rate : 0;
      return acc + amount;
    }, 0);
    setTotalAmount(total);
  }, [plantData]);

  const handleInputChange = (index, field, value) => {
    const updatedPlants = plantData.map((plant, i) =>
      i === index ? { ...plant, [field]: value, amount: value * plant.rate || plant.quantity * value || 0 } : plant
    );
    setPlantData(updatedPlants);
  };

  const saveAsPDF = () => {
    const element = invoiceRef.current;
    const opt = {
      margin: 0,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 4, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };

    html2pdf().from(element).set(opt).save();
  };

  // Function to convert total amount to words
  const getAmountInWords = (amount) => {
    if (amount === 0) return "Zero";
    return numberToWords.toWords(amount).toUpperCase();
  };

  return (
    <>
      <section className="invoice-main" ref={invoiceRef}>
        <div className="invoice-contact">
          <p className="mb-0 fw-bold">9821926638</p>
          <p className="mb-1 fw-bold">7654038399</p>
        </div>
        <div className="invoice-name">
          <h1 className="mb-0">SANJEEV SINGH</h1>
        </div>
        <div className="invoice-details">
          <h3 className="mb-0">Nursery & Potteries</h3>
          <p className="mb-0">Earthen Pots, Cement Pots, Outdoor, Indoor & Flower Plants</p>
          <p className="mb-1">All Kind of Plants, Dealing Gardening Material & Garden Maintenance</p>
        </div>
        <div className="horizontal-rule"></div>
        <div className="invoice-address mb-3">
          <p className="mb-0">Hans Burga Marg, Kalina Road, Near Shivaji Nagar, Maratha Colony,</p>
          <p className="mb-0">Santacruz (E), Mumbai - 400055</p>
        </div>

        <div className="invoice-quotation">
          <div className="quotation-1">
            <p className="mb-0 ms-1">Quotation To</p>
            <p className="mb-0 ms-1">B Kandhari LLP</p>
            <p className="mb-0 ms-1">891 Blue Nile Building 4th Floor, Near Tavaa Hotel Bandra (W)</p>
            <p className="mb-0 ms-1">Mumbai 50</p>
          </div>
          <div className="quotation-2">
            {/* Add input fields for Bill No and Date */}
            <p className="mb-0 ms-1">
              Bill No:{" "}
              <input
              className="ms-1"
                type="text"
                value={billNo}
                onChange={(e) => setBillNo(e.target.value)}
                placeholder="Enter Bill No"
              />
            </p>
            <p className="mb-0 ms-1">
              Date:{" "}
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </p>
          </div>
        </div>

        {/* Table Section */}
        <div className="invoice-table">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {plantData.map((plant, index) => (
                <tr key={plant.id}>
                  <td className="td1">{index + 1}</td>
                  <td className="td2">{plant.common_name} ({plant.scientific_name})</td>
                  <td className="td3">
                    <input
                      type="number"
                      value={plant.quantity}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", parseFloat(e.target.value) || "")
                      }
                      placeholder="Enter quantity"
                    />
                  </td>
                  <td className="td4">
                    <input
                      type="number"
                      value={plant.rate}
                      onChange={(e) =>
                        handleInputChange(index, "rate", parseFloat(e.target.value) || "")
                      }
                      placeholder="Enter rate"
                    />
                  </td>
                  <td className="td5">{plant.quantity && plant.rate ? plant.quantity * plant.rate : "-"}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" style={{ textAlign: "right" }}>
                  <strong>Total Rs.</strong>
                </td>
                <td>{totalAmount}/-</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="invoice-note mt-3 ms-4">
          <p className="mb-0">
            (Rupees <u>{getAmountInWords(totalAmount)}</u>)
          </p>
          <p>Thanking you</p>
        </div>
        <div className="invoice-ending">
          <p className="mb-0">Sanjeev Singh</p>
          <p className="mb-0">Proprietor</p>
        </div>
      </section>

      {/* Save as PDF Button */}
      <div className="invoice-actions">
        <button onClick={saveAsPDF} className="btn btn-primary mt-3">
          Save as PDF
        </button>
      </div>
    </>
  );
};

export default Invoice;
