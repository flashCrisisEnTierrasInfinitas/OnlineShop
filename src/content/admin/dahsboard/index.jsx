import ContedAdmin from "../components/Conter";
import BarChart from "./BarChart";
import CWidgetStatsD from "./CWidgetStatsD";
import Doughnut from "./Doughnut ";

export default function DahsboardAdmin() {
  return (
    <ContedAdmin>
      <h1>dahsboard</h1>

      <div className="box-admin">
        <CWidgetStatsD />
      </div>
      <div className="box-cont-admin">
        <div className="box-admin">
          <BarChart />
        </div>
        <div className="box-admin">
          <Doughnut />
        </div>
      </div>
    </ContedAdmin>
  );
}
