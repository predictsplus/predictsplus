import { useState } from "react";
import Loader from "./Loader";

const HistoryTable = ({
  historyTab,
  setHistoryTab,
  depositHistory,
  withdrawHistory,
  isDepositLoading,
  isUserLoading,
  isWithdrawLoading
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const data = historyTab === 1 ? depositHistory : withdrawHistory;
  const totalPages = Math.ceil(data.length / recordsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleTabChange = (tab: number) => {
    setHistoryTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="w-full mt-8 text-center">
      <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl w-full mx-auto">
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => handleTabChange(1)}
            className={`px-4 py-1 rounded-full text-sm ${
              historyTab === 1 ? "bg-pBlue text-white" : "bg-white/10 text-gray-300"
            }`}
          >
            Deposit History
          </button>
          <button
            onClick={() => handleTabChange(2)}
            className={`px-4 py-1 rounded-full text-sm ${
              historyTab === 2 ? "bg-pBlue text-white" : "bg-white/10 text-gray-300"
            }`}
          >
            Withdraw History
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            {paginatedData.length > 0 && (
              <thead>
                <tr className="text-gray-300 border-b border-white/10">
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Date</th>
                </tr>
              </thead>
            )}
            <tbody>
              {historyTab === 1 && isDepositLoading && isWithdrawLoading && !isUserLoading ? (
                <tr>
                  <td colSpan={2} className="py-6 text-center">
                    <Loader />
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((entry, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="py-2 px-4 text-white">
                      {historyTab === 1 ? "+" : "-"} ₹{entry?.amount.toFixed(2)}{" "}
                      <span className="text-[#FED348]">
                        ({entry?.ppoints?.toFixed(2)} PPoints)
                      </span>
                    </td>
                    <td className="py-2 px-4 text-gray-400">{entry?.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="py-4 text-center text-gray-400">
                    No transactions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {data.length > recordsPerPage && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white/10 text-gray-300 rounded disabled:opacity-50"
            >
              {'<'}
            </button>
            <span className="px-3 py-1 text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-white/10 text-gray-300 rounded disabled:opacity-50"
            >
              {'>'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryTable;