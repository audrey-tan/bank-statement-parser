"use client";

import { useState } from "react";
import { parseStatement } from "./actions"; 

import TransactionTable from "@/components/TransactionTable";
import FileUpload from "@/components/FileUpload";
import Loading from "@/components/Loading";

import { TypographyH2, TypographyH3, TypographyH4, TypographyP } from "@/components/ui/typography";


export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);
  const [walmartPurchases, setWalmartPurchases] = useState<any>({});

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await parseStatement(file);

      setName(getName(result));
      setAddress(getAddress(result));
      setTotalDeposit(getTotalDeposit(result));
      setTotalWithdrawal(getTotalWithdrawal(result));
      setWalmartPurchases(getWalmartPurchases(result));

    } catch (err) {
      setError("Failed to parse bank statement.");
    } finally {
      setIsLoading(false);
    }
  };

  function getName(jsonData: any) {
    return jsonData.message.result[0].result.output.BankStatementParser["name"];
  }

  function getAddress(jsonData: any) {
    return jsonData.message.result[0].result.output.BankStatementParser["address"];
  }

  function getTotalDeposit(jsonData: any) {
    const deposits = jsonData.message.result[0].result.output.BankStatementParser["Deposit and Other Credits"];

    let total = 0;
    for (const d of deposits) total += d;

    return total;
  };

  function getTotalWithdrawal(jsonData: any) {
    const withdrawals = jsonData.message.result[0].result.output.BankStatementParser["Withdrawal and Other Debits"];

    let total = 0;
    for (const w of withdrawals) total += w;

    return total;
  };

  function getWalmartPurchases(jsonData: any) {
    const walmartPurchases = jsonData.message.result[0].result.output.BankStatementParser["wal-mart purchases"];
    
    // If it's not an array, put it in an array
    return Array.isArray(walmartPurchases) ? walmartPurchases : [walmartPurchases];
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-2 pt-16 sm:p-16">
      {/* Title */}
      <div className="w-full text-center px-4 sm:px-32">
        <TypographyH2> Bill Statement Parser </TypographyH2>
      </div>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row w-4/5 max-w-5xl mt-6 gap-4">
        {/* Left Column */}
        <div className="flex-1">
        {error ? (
            <TypographyP className="text-red-700">{error}</TypographyP>
          ) : (
            <>
              <div style={{ visibility: isLoading ? 'hidden' : 'visible', height: isLoading ? '0' : 'auto' }}>
                <FileUpload onFileUpload={handleFileUpload} />
              </div>
              {isLoading && <Loading />}
            </>
          )}
        </div>
        {/* Right Column */}
        <div className="flex-1 flex flex-col p-4 bg-slate-50 gap-4 rounded-xl">
          <div className="p-4">
            <TypographyH3 className="font-extrabold"> {name} </TypographyH3>
            <TypographyH4 className="text-gray-400 pt-2"> {address} </TypographyH4>
          </div>
          <div className="flex justify-between items-center p-7 border border-violet-200 bg-gradient-to-r from-slate-50 via-violet-50 to-[#E6E2FE] rounded-lg shadow-md mb-2">
            <TypographyH3> Total deposit: </TypographyH3>
            <TypographyH3 className="font-extrabold text-accent">$ {totalDeposit}</TypographyH3>
          </div>
          <div className="flex justify-between items-center p-7 border border-violet-200 bg-gradient-to-r from-slate-50 via-violet-50 to-[#E6E2FE] rounded-lg shadow-md">
            <TypographyH3> Total withdrawal: </TypographyH3>
            <TypographyH3 className="font-extrabold text-accent">$ {totalWithdrawal}</TypographyH3>
          </div>
          <div className="flex flex-col justify-between items-left p-4 bg-slate-50">
            <TypographyH3 className="pb-6"> Walmart purchases: </TypographyH3>
            <TransactionTable transactions={walmartPurchases}></TransactionTable>
          </div>
        </div>
      </div>
    </div>
  );
}
