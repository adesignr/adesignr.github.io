function initMap() {
    var arp = { lat: 50.631225, lng: 7.207031 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: arp
    });
    var marker = new google.maps.Marker({
        position: arp,
        map: map
    });

}

(function() {

    var scroll = new SmoothScroll('a[href*="#"]'),
        agenda = document.querySelector('#agenda'),
        tabs = agenda.querySelectorAll('.tab'),
        heights = [],
        agenda_lists = agenda.querySelectorAll('.agenda-list'),
        agenda_buttons = agenda.querySelectorAll('.button'),
        tab_click = function() {
            var id = this.id;

            for (var i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove('active');
                agenda_lists[i].classList.add('hide');

            }

            this.classList.add('active');
            document.getElementById('agenda-' + id).classList.remove('hide');

        },
        agenda_expand = function(target, heights) {
            var count;

            if (target.parentNode.parentNode.id === "agenda-thursday") { count = 0; }
            else if (target.parentNode.parentNode.id === "agenda-friday") { count = 1; }
            else if (target.parentNode.parentNode.id === "agenda-saturday") { count = 2; }

            if (target.classList.contains('expand')) {
                target.innerHTML = "Mehr anzeigen";

                target.parentNode.previousElementSibling.style.maxHeight = heights[count];
                target.classList.remove('expand');
            } else {
                target.innerHTML = "Weniger anzeigen";

                target.parentNode.previousElementSibling.style.maxHeight = '100%';
                target.classList.add('expand');
            }
        };

    for (var i = 0; i < tabs.length; i++) {
        var current_agenda = agenda_lists[i],
        agenda_entries = current_agenda.querySelectorAll('.agenda-entry');

        current_agenda.classList.remove('hide');

        var list_height = agenda_entries[0].offsetHeight + agenda_entries[1].offsetHeight + agenda_entries[2].offsetHeight + agenda_entries[3].offsetHeight + agenda_entries[agenda_entries.length - 1].offsetHeight;

        if (i > 0) { current_agenda.classList.add('hide');}

        list_height = 'calc(' + list_height + 'px + 1rem)';
        heights.push(list_height);
        current_agenda.querySelector('.wrap').style.maxHeight = heights[i];
        tabs[i].addEventListener('click', tab_click);
    }

    [].forEach.call(agenda_buttons,function(e){e.addEventListener('click',function(e) { e.preventDefault(); agenda_expand(e.target, heights) },false)});
})();