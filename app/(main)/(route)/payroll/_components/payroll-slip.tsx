import React from "react";
import "./payroll-slip.css";

type Props = {};

const PayrollSlip = (props: Props) => {
  return (
    <div id="payslip">
      <div id="title">Payslip</div>
      <div id="scope">
        <div className="scope-entry">
          <div className="title">PAY RUN</div>
          <div className="value">Mar 15, 2015</div>
        </div>
        <div className="scope-entry">
          <div className="title">PAY PERIOD</div>
          <div className="value">Mar 1 - Mar 15, 2015</div>
        </div>
      </div>
      <div className="content">
        <div className="left-panel">
          <div id="employee">
            <div id="name">Piven El'Sync</div>
            <div id="email">mary.ann+Regr06@salarium.com</div>
          </div>
          <div className="details">
            <div className="entry">
              <div className="label">Employee ID</div>
              <div className="value">Reg-006</div>
            </div>
            <div className="entry">
              <div className="label">Tax Status</div>
              <div className="value">Married - 2 Dependents</div>
            </div>
            <div className="entry">
              <div className="label">Hourly Rate</div>
              <div className="value">1,023.68</div>
            </div>
            <div className="entry">
              <div className="label">Company Name</div>
              <div className="value">Not a Shady One</div>
            </div>
            <div className="entry">
              <div className="label">Date Hired</div>
              <div className="value">Dec 1, 1862</div>
            </div>
            <div className="entry">
              <div className="label">Position</div>
              <div className="value">Point Guard</div>
            </div>
            <div className="entry">
              <div className="label">Department</div>
              <div className="value">1st String</div>
            </div>
            <div className="entry">
              <div className="label">Rank</div>
              <div className="value">MVP</div>
            </div>
            <div className="entry">
              <div className="label">Payroll Cycle</div>
              <div className="value">Semi-Monthly</div>
            </div>
            <div className="entry">
              <div className="label">Cost Center</div>
              <div className="value">Under the Table Funds</div>
            </div>
            <div className="entry">
              <div className="label">TIN</div>
              <div className="value">123-123-123-123</div>
            </div>
            <div className="entry">
              <div className="label">SSS</div>
              <div className="value">12-3123123-1</div>
            </div>
            <div className="entry">
              <div className="label">HDMF</div>
              <div className="value">1231-2312-3123</div>
            </div>
            <div className="entry">
              <div className="label">Philhealth</div>
              <div className="value">12-312312312-3</div>
            </div>
            <div className="entry">
              <div className="label">Prepared by</div>
              <div className="value">Piven Himself</div>
            </div>
          </div>
          <div className="gross">
            <div className="title">Gross Income</div>
            <div className="entry">
              <div className="label"></div>
              <div className="value">92,823.86</div>
            </div>
          </div>
          <div className="contributions">
            <div className="title">Employer Contribution</div>
            <div className="entry">
              <div className="label">SSS</div>
              <div className="value">1,178.70</div>
            </div>
            <div className="entry">
              <div className="label">SSS EC</div>
              <div className="value">30.00</div>
            </div>
            <div className="entry">
              <div className="label">HDMF</div>
              <div className="value">100.00</div>
            </div>
            <div className="entry">
              <div className="label">PhilHealth</div>
              <div className="value">437.50</div>
            </div>
          </div>
          <div className="ytd">
            <div className="title">Year To Date Figures</div>
            <div className="entry">
              <div className="label">Gross Income</div>
              <div className="value">92,823.86</div>
            </div>
            <div className="entry">
              <div className="label">Taxable Income</div>
              <div className="value">82,705.06</div>
            </div>
            <div className="entry">
              <div className="label">Withholding Tax</div>
              <div className="value">21,548.85</div>
            </div>
            <div className="entry">
              <div className="label">Net Pay</div>
              <div className="value">69,656.21</div>
            </div>
            <div className="entry">
              <div className="label">Allowance</div>
              <div className="value">2,500.00</div>
            </div>
            <div className="entry">
              <div className="label">Bonus</div>
              <div className="value">21,409.34</div>
            </div>
            <div className="entry">
              <div className="label">Commission</div>
              <div className="value">5,500.00</div>
            </div>
            <div className="entry">
              <div className="label">Deduction</div>
              <div className="value">500.00</div>
            </div>
            <div className="entry">
              <div className="label">SSS Employer</div>
              <div className="value">1,178.70</div>
            </div>
            <div className="entry">
              <div className="label">SSS EC Employer</div>
              <div className="value">30.00</div>
            </div>
            <div className="entry">
              <div className="label">PhilHealth Employer</div>
              <div className="value">437.50</div>
            </div>
            <div className="entry">
              <div className="label">Pag-ibig Employer</div>
              <div className="value">100.00</div>
            </div>
          </div>
        </div>
        <div className="right-panel">
          <div className="details">
            <div className="basic-pay">
              <div className="entry">
                <div className="label">Basic Pay</div>
                <div className="detail"></div>
                <div className="rate">45,000.00/Month</div>
                <div className="amount">45,000.00</div>
              </div>
            </div>
            <div className="salary">
              <div className="entry">
                <div className="label">Salary</div>
                <div className="detail"></div>
                <div className="rate"></div>
                <div className="amount"></div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Undertime</div>
                <div className="rate">128hrs@259.62/hr</div>
                <div className="amount">(33,231.36)</div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Unworked Holiday</div>
                <div className="rate">16hrs@259.62/hr</div>
                <div className="amount">4,153.92</div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Regular Holiday Regular Holiday</div>
                <div className="rate">9hrs@778.85/hr</div>
                <div className="amount">7,009.65</div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">
                  Regular Holiday Regular Holiday Night
                </div>
                <div className="rate">7hrs@856.73/hr</div>
                <div className="amount">5,997.11</div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Night</div>
                <div className="rate">56hrs@285.582/hr</div>
                <div className="amount">15,992.59</div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Regular Holiday</div>
                <div className="rate">9hrs@519.23/hr</div>
                <div className="amount">4,673.07</div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Regular Holiday Night</div>
                <div className="rate">7hrs@571.15/hr</div>
                <div className="amount">3,998.05</div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Regular Holiday Night Overtime</div>
                <div className="rate">2hrs@742.50/hr</div>
                <div className="amount">1,485.00</div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Special Holiday</div>
                <div className="rate">9hrs@337.50/hr</div>
                <div className="amount">3,037.50</div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Special Holiday Night</div>
                <div className="rate">7hrs@371.25/hr</div>
                <div className="amount">2,598.75</div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Rest Day</div>
                <div className="rate">8hrs@337.50/hr</div>
                <div className="amount">2,700.00</div>
              </div>
            </div>
            <div className="leaves">
              <div className="entry">
                <div className="label">Leaves</div>
                <div className="detail"></div>
                <div className="rate"></div>
                <div className="amount"></div>
              </div>
              <div className="entry paid">
                <div className="label"></div>
                <div className="detail">Paid Leave</div>
                <div className="rate">8hrs@259.62/hr</div>
                <div className="amount">2,076.92</div>
              </div>
              <div className="entry unpaid">
                <div className="label"></div>
                <div className="detail">Unpaid Leave</div>
                <div className="rate">8hrs@259.62/hr</div>
                <div className="amount">(2076.96)</div>
              </div>
            </div>
            <div className="taxable_allowance">
              <div className="entry">
                <div className="label">Taxable Allowance</div>
                <div className="detail"></div>
                <div className="rate"></div>
                <div className="amount"></div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Allowance Name</div>
                <div className="rate"></div>
                <div className="amount">1,000.00</div>
              </div>
            </div>
            <div className="taxable_bonus">
              <div className="entry">
                <div className="label">Taxable Bonus</div>
                <div className="detail"></div>
                <div className="rate"></div>
                <div className="amount"></div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Bonus Name</div>
                <div className="rate"></div>
                <div className="amount">19,409.34</div>
              </div>
            </div>
            <div className="taxable_commission"></div>
            <div className="contributions">
              <div className="entry">
                <div className="label">Contributions</div>
                <div className="detail"></div>
                <div className="rate"></div>
                <div className="amount"></div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">SSS</div>
                <div className="rate"></div>
                <div className="amount">(581.30)</div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">HDMF</div>
                <div className="rate"></div>
                <div className="amount">(100.00)</div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">PhilHealth</div>
                <div className="rate"></div>
                <div className="amount">(437.50)</div>
              </div>
            </div>
            <div className="nti">
              <div className="entry">
                <div className="label">TAXABLE INCOME</div>
                <div className="detail"></div>
                <div className="rate"></div>
                <div className="amount">82,705.06</div>
              </div>
            </div>
            <div className="withholding_tax">
              <div className="entry">
                <div className="label">Withholding Tax</div>
                <div className="detail"></div>
                <div className="rate"></div>
                <div className="amount">(21,548.85)</div>
              </div>
            </div>
            <div className="non_taxable_allowance">
              <div className="entry">
                <div className="label">Non-Taxable Allowance</div>
                <div className="detail"></div>
                <div className="rate"></div>
                <div className="amount"></div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Allowance Name</div>
                <div className="rate"></div>
                <div className="amount">1,500.00</div>
              </div>
            </div>
            <div className="non_taxable_bonus">
              <div className="entry">
                <div className="label">Non-Taxable Bonus</div>
                <div className="detail"></div>
                <div className="rate"></div>
                <div className="amount"></div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Bonus Name</div>
                <div className="rate"></div>
                <div className="amount">2,000.00</div>
              </div>
            </div>
            <div className="non_taxable_commission">
              <div className="entry">
                <div className="label">Non-Taxable Commission</div>
                <div className="detail"></div>
                <div className="rate"></div>
                <div className="amount"></div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Commission Name 1</div>
                <div className="rate"></div>
                <div className="amount">3,000.00</div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">Commission Name 2</div>
                <div className="rate"></div>
                <div className="amount">2,500.00</div>
              </div>
            </div>
            <div className="deductions">
              <div className="entry">
                <div className="label">Deductions</div>
                <div className="detail"></div>
                <div className="rate"></div>
                <div className="amount"></div>
              </div>
              <div className="entry">
                <div className="label"></div>
                <div className="detail">HMO</div>
                <div className="rate"></div>
                <div className="amount">(500.00)</div>
              </div>
            </div>
            <div className="net_pay">
              <div className="entry">
                <div className="label">NET PAY</div>
                <div className="detail"></div>
                <div className="rate"></div>
                <div className="amount">69,656.21</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollSlip;
