function create_table(table_header_name) {

    var container = document.querySelector('.container');

    var table = document.createElement('table');

    table.id = table_header_name

    var header_row = table.insertRow();
    var header_cell = header_row.insertCell(0);

    header_cell.colSpan = 4;
    header_cell.innerHTML = table_header_name;

    var second_row = table.insertRow();

    var second_cell_1 = second_row.insertCell(0);
    var second_cell_2 = second_row.insertCell(1);
    var second_cell_3 = second_row.insertCell(2);
    var second_cell_4 = second_row.insertCell(3);

    second_cell_1.innerHTML = 'Hat No';
    second_cell_2.innerHTML = 'Otobüs Adı';
    second_cell_3.innerHTML = 'İstikamet';
    second_cell_4.innerHTML = 'Süre';

    container.appendChild(table);

}

function fetch_and_fill_table_data(route_no, table_id) {

    fetch(`https://ahmetalper-api.hf.space/bus/${route_no}`)

        .then(response => response.json())

        .then(data => {

            console.log(data);

            var table = document.getElementById(table_id);

            for (let i = table.rows.length - 1; i >= 2; i--) {
                table.deleteRow(i);
            }

            data.forEach(function(item) {

                var row = table.insertRow(-1);

                var route_no = row.insertCell(0);
                var name = row.insertCell(1);
                var direction = row.insertCell(2);
                var duration = row.insertCell(3);

                route_no.innerHTML = item.route_no;
                name.innerHTML = item.name;
                direction.innerHTML = item.direction;
                duration.innerHTML = item.duration;

                // console.log(item.duration);
                console.log(item.duration !== ' X ');
                console.log(parseInt(item.duration) < 5);

                if (item.duration !== ' X ') {

                    if (parseInt(item.duration) <= 5) {
                        duration.style.color = '#3cff00';
                    }

                    if (5 < parseInt(item.duration) && parseInt(item.duration) <= 10) {
                        duration.style.color = '#e9ec05';
                    }

                    if (10 < parseInt(item.duration) && parseInt(item.duration) <= 15) {
                        duration.style.color = '#eca60e';
                    }

                    if (15 < parseInt(item.duration)) {
                        duration.style.color = '#ff0000';
                    }

                }

            });

            var table = document.getElementById(table_id);

            var header_row = table.rows[0];

            header_row.cells[0].colSpan = 4;

            header_row.cells[0].innerHTML = `${table_id} &nbsp&nbsp&nbsp | &nbsp&nbsp&nbsp ${new Date().toLocaleTimeString()}`;

        })

        .catch(error => console.error('Error fetching data:', error));

}

function refresh_tables() {
    fetch_and_fill_table_data(94, 'Stad');
    fetch_and_fill_table_data(11, 'Millet Bahçesi');
    fetch_and_fill_table_data(2103, 'Mavili');
    fetch_and_fill_table_data(26, 'Anıt');
    fetch_and_fill_table_data(25, 'Konevi');
    fetch_and_fill_table_data(1804, 'Konya Gıda ve Tarım Üniversitesi');
    fetch_and_fill_table_data(95, 'Serhat');
}

create_table('Stad')
create_table('Mavili')
create_table('Millet Bahçesi')
create_table('Anıt')
create_table('Konevi')
create_table('Konya Gıda ve Tarım Üniversitesi')
create_table('Serhat')

refresh_tables();

setInterval(refresh_tables, 30000);
