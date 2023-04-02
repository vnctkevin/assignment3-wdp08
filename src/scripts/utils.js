function format_date(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const dateTemp = new Date(date);
    return dateTemp.toLocaleDateString("id-ID", options);
}

const loader = () => `<div class="pt-4 mx-3 d-flex align-items-center">
<strong>Loading Countries...</strong>
<div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
</div>`

function formatRibuan(angka) {
    let separator = ".";
    var number_string = angka.replace(/[^,\d]/g, "").toString(),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        satuan = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        separator = sisa ? "." : "";
        satuan += separator + ribuan.join(".");
    }

    satuan = split[1] != undefined ? satuan + "," + split[1] : satuan;
    return satuan;

}
export { format_date, loader, formatRibuan };
