import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./styles.css";

import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import * as firebase from "firebase";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { ProgressBar } from "primereact/progressbar";
import classNames from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createRowTable } from "../../utils";

const path =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://poc-veronica-app.web.app";

export const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedRepresentatives, setSelectedRepresentatives] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  let dt = useRef(null);

  const representatives = [
    { name: "Amy Elsner", image: "amyelsner.png" },
    { name: "Anna Fali", image: "annafali.png" },
    { name: "Asiya Javayant", image: "asiyajavayant.png" },
    { name: "Bernardo Dominic", image: "bernardodominic.png" },
    { name: "Elwin Sharvill", image: "elwinsharvill.png" },
    { name: "Ioni Bowcher", image: "ionibowcher.png" },
    { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
    { name: "Onyama Limba", image: "onyamalimba.png" },
    { name: "Stephen Shaw", image: "stephenshaw.png" },
    { name: "XuXue Feng", image: "xuxuefeng.png" },
  ];

  const statuses = [
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
    "proposal",
  ];

  function onNext(DocumentSnap) {
    const wrapper = [];
    DocumentSnap.forEach((doc) => {
      const data = doc.data();
      wrapper.push(
        createRowTable({
          uuid: doc.id,
          name: data.name,
          country: data.country,
          project: data.project,
          date: data.date,
          status: data.accepted,
          percentaje: data.percentaje,
        })
      );
    });
    setCustomers(wrapper);
    setLoading(false);
  }

  function onError(error) {
    console.log(error);
  }

  useEffect(() => {
    const suscribe = firebase
      .firestore()
      .collection("clients")
      .onSnapshot(onNext, onError);
  }, []);

  if (loading) {
    return (
      <div>
        <span>Loding.........</span>
      </div>
    );
  }

  const renderHeader = () => {
    return (
      <div>
        Client's list
        <div className="p-datatable-globalfilter-container">
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Global Search"
          />
        </div>
      </div>
    );
  };

  const activityBodyTemplate = (rowData) => {
    return <ProgressBar value={rowData.activity} showValue={false} />;
  };

  const actionBodyTemplate = (item) => {
    return [
      <Button
        type="button"
        icon="pi pi-user-edit"
        className="p-button-warning"
        onClick={() => console.log("click", item)}
      ></Button>,
      <Button
        type="button"
        icon="pi pi-trash"
        className="p-button-danger"
        onClick={() => {
          console.log("click", item.id);
        }}
      ></Button>,
      <CopyToClipboard
        text={`${path}/${item.id}`}
        onCopy={() => console.log("copied")}
      >
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-secondary"
        ></Button>
      </CopyToClipboard>,
    ];
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={classNames("customer-badge", "status-" + rowData.status)}
      >
        {rowData.status}
      </span>
    );
  };

  const countryBodyTemplate = (rowData) => {
    let { name, code } = rowData.country;

    return (
      <React.Fragment>
        <img
          src="showcase/demo/images/flag_placeholder.png"
          srcSet="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
          alt={name}
          className={classNames("flag", "flag-" + code)}
        />
        <span style={{ verticalAlign: "middle", marginLeft: ".5em" }}>
          {name}
        </span>
      </React.Fragment>
    );
  };

  const representativeBodyTemplate = (rowData) => {
    const src = "showcase/demo/images/avatar/" + rowData.representative.image;

    return (
      <React.Fragment>
        <img
          alt={rowData.representative.name}
          srcSet="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
          src={src}
          width="32"
          style={{ verticalAlign: "middle" }}
        />
        <span style={{ verticalAlign: "middle", marginLeft: ".5em" }}>
          {rowData.representative.name}
        </span>
      </React.Fragment>
    );
  };

  const renderRepresentativeFilter = () => {
    return (
      <MultiSelect
        className="p-column-filter"
        value={selectedRepresentatives}
        options={representatives}
        onChange={onRepresentativeFilterChange}
        itemTemplate={representativeItemTemplate}
        placeholder="All"
        optionLabel="name"
        optionValue="name"
      />
    );
  };

  const representativeItemTemplate = (option) => {
    const src = "showcase/demo/images/avatar/" + option.image;

    return (
      <div className="p-multiselect-representative-option">
        <img
          alt={option.name}
          src={src}
          srcSet="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
          width="32"
          style={{ verticalAlign: "middle" }}
        />
        <span style={{ verticalAlign: "middle", marginLeft: ".5em" }}>
          {option.name}
        </span>
      </div>
    );
  };

  const onRepresentativeFilterChange = (event) => {
    dt.current.filter(event.value, "representative.name", "in");
    setSelectedRepresentatives(event.value);
  };

  const renderDateFilter = () => {
    return (
      <Calendar
        value={dateFilter}
        onChange={onDateFilterChange}
        placeholder="Registration Date"
        dateFormat="yy-mm-dd"
        className="p-column-filter"
      />
    );
  };

  const onDateFilterChange = (event) => {
    if (event.value !== null)
      dt.current.filter(formatDate(event.value), "date", "equals");
    else dt.current.filter(null, "date", "equals");

    setDateFilter(event.value);
  };

  const filterDate = (value, filter) => {
    if (
      filter === undefined ||
      filter === null ||
      (typeof filter === "string" && filter.trim() === "")
    ) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    return value === formatDate(filter);
  };

  const formatDate = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    return date.getFullYear() + "-" + month + "-" + day;
  };

  const renderStatusFilter = () => {
    return (
      <Dropdown
        value={selectedStatus}
        options={statuses}
        onChange={onStatusFilterChange}
        itemTemplate={statusItemTemplate}
        showClear={true}
        placeholder="Select a Status"
        className="p-column-filter"
      />
    );
  };

  const statusItemTemplate = (option) => {
    return (
      <span className={classNames("customer-badge", "status-" + option)}>
        {option}
      </span>
    );
  };

  const onStatusFilterChange = (event) => {
    dt.current.filter(event.value, "status", "equals");
    setSelectedStatus(event.value);
  };

  const header = renderHeader();
  const representativeFilter = renderRepresentativeFilter();
  const dateFilterEl = renderDateFilter();
  const statusFilter = renderStatusFilter();

  return (
    <main>
      <div className="datatable-doc-demo">
        <DataTable
          ref={dt}
          value={customers}
          header={header}
          responsive
          className="p-datatable-customers"
          dataKey="id"
          rowHover
          globalFilter={globalFilter}
          //   selection={selectedCustomers}
          //   onSelectionChange={(e) => setSelectedCustomers(e.value)}
          paginator
          rows={10}
          emptyMessage="No customers found"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
        >
          {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
          <Column
            field="name"
            header="Name"
            sortable
            filter
            filterPlaceholder="Search by name"
          />
          <Column
            sortField="country.name"
            filterField="country.name"
            header="Country"
            body={countryBodyTemplate}
            sortable
            filter
            filterMatchMode="contains"
            filterPlaceholder="Search by country"
          />
          <Column
            sortField="representative.name"
            filterField="representative.name"
            header="Projects"
            body={representativeBodyTemplate}
            sortable
            filter
            filterElement={representativeFilter}
          />
          <Column
            field="date"
            header="Date"
            sortable
            filter
            filterMatchMode="custom"
            filterFunction={filterDate}
            filterElement={dateFilterEl}
          />
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
            filter
            filterElement={statusFilter}
          />
          <Column
            field="activity"
            header="Percentaje"
            body={activityBodyTemplate}
            sortable
            filter
            filterMatchMode="gte"
            filterPlaceholder="Minimum"
          />
          <Column
            body={actionBodyTemplate}
            headerStyle={{ width: "8em", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
          />
        </DataTable>
      </div>
    </main>
  );
};
