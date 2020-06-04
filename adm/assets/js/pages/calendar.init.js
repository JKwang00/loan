! function(l) {
    "use strict";

    function e() {
        this.$body = l("body"), this.$modal = l("#event-modal"), this.$calendar = l("#calendar"), this.$formEvent = l("#form-event"), this.$btnNewEvent = l("#btn-new-event"), this.$btnDeleteEvent = l("#btn-delete-event"), this.$btnSaveEvent = l("#btn-save-event"), this.$modalTitle = l("#modal-title"), this.$calendarObj = null, this.$selectedEvent = null, this.$newEventData = null
    }
    e.prototype.onEventClick = function(e) {
        this.$formEvent[0].reset(), this.$formEvent.removeClass("was-validated"), this.$newEventData = null, this.$btnDeleteEvent.show(), this.$modalTitle.text("Edit Event"), this.$modal.modal({
            backdrop: "static"
        }), this.$selectedEvent = e.event, l("#event-title").val(this.$selectedEvent.title), l("#event-category").val(this.$selectedEvent.classNames[0])
    }, e.prototype.onSelect = function(e) {
        this.$formEvent[0].reset(), this.$formEvent.removeClass("was-validated"), this.$selectedEvent = null, this.$newEventData = e, this.$btnDeleteEvent.hide(), this.$modalTitle.text("Add New Event"), this.$modal.modal({
            backdrop: "static"
        }), this.$calendarObj.unselect()
    }, e.prototype.init = function() {
        var e = new Date(l.now());
        new FullCalendarInteraction.Draggable(document.getElementById("external-events"), {
            itemSelector: ".external-event",
            eventData: function(e) {
                return {
                    title: e.innerText,
                    className: l(e).data("class")
                }
            }
        });
        var t = [{
                title: "Meeting with Mr. Shreyu",
                start: new Date(l.now() + 158e6),
                end: new Date(l.now() + 338e6),
                className: "bg-warning"
            }, {
                title: "Interview - Backend Engineer",
                start: e,
                end: e,
                className: "bg-success"
            }, {
                title: "Phone Screen - Frontend Engineer",
                start: new Date(l.now() + 168e6),
                className: "bg-info"
            }, {
                title: "Buy Design Assets",
                start: new Date(l.now() + 338e6),
                end: new Date(l.now() + 4056e5),
                className: "bg-primary"
            }],
            a = this;
        a.$calendarObj = new FullCalendar.Calendar(a.$calendar[0], {
            plugins: ["bootstrap", "interaction", "dayGrid", "timeGrid", "list"],
            slotDuration: "00:15:00",
            minTime: "08:00:00",
            maxTime: "19:00:00",
            themeSystem: "bootstrap",
            bootstrapFontAwesome: !1,
            buttonText: {
                today: "Today",
                month: "Month",
                week: "Week",
                day: "Day",
                list: "List",
                prev: "Prev",
                next: "Next"
            },
            defaultView: "dayGridMonth",
            handleWindowResize: !0,
            height: l(window).height() - 200,
            header: {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
            },
            events: t,
            editable: !0,
            droppable: !0,
            eventLimit: !0,
            selectable: !0,
            dateClick: function(e) {
                a.onSelect(e)
            },
            eventClick: function(e) {
                a.onEventClick(e)
            }
        }), a.$calendarObj.render(), a.$btnNewEvent.on("click", function(e) {
            a.onSelect({
                date: new Date,
                allDay: !0
            });
        }), a.$formEvent.on("submit", function(e) {
            e.preventDefault();
            var t = a.$formEvent[0];
            if (t.checkValidity()) {
                if (a.$selectedEvent) a.$selectedEvent.setProp("title", l("#event-title").val()), a.$selectedEvent.setProp("classNames", [l("#event-category").val()]);
                else {
                    var n = {
                        title: l("#event-title").val(),
                        start: a.$newEventData.date,
                        allDay: a.$newEventData.allDay,
                        className: l("#event-category").val()
                    };
                    a.$calendarObj.addEvent(n)
                }
                a.$modal.modal("hide")
            } else e.stopPropagation(), t.classList.add("was-validated")
        }), l(a.$btnDeleteEvent.on("click", function(e) {
            a.$selectedEvent && (a.$selectedEvent.remove(), a.$selectedEvent = null, a.$modal.modal("hide"))
        }))
    }, l.CalendarApp = new e, l.CalendarApp.Constructor = e
}(window.jQuery),
function() {
    "use strict";
    window.jQuery.CalendarApp.init()
}();