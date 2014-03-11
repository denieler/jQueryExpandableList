(function (jQuery) {
    var $ = jQuery;

    function ExpandableAjaxList(options) {
        options = options || {};

        this.ulSelector = '#' + options.id;

        this.refreshUrl = options.refreshUrl;
        this.initUrl = options.initUrl || options.refreshUrl;

        this.fieldID = options.fieldID || 'id';
        this.fieldText = options.fieldText || 'value';

        this.sortByField = options.sortByField || 'id';
        this.sortArrange = options.sortArrange || 'asc';

        this.intervalID;
        this.refreshInterval = options.refreshInterval;

        this.init();
    }

    ExpandableAjaxList.prototype.init = function () {
        var self = this;

        $.ajax({
            type: 'POST',
            url: self.initUrl
        }).done(function (result) {
            self.fillData(result);
        }).then(function () {
            if (self.refreshInterval)
                self.intervalID = window.setInterval(function () { self.refresh() }, self.refreshInterval);
        });
    }
    ExpandableAjaxList.prototype.refresh = function () {
        var self = this;

        $.ajax({
            type: 'POST',
            url: self.refreshUrl
        }).done(function (result) {
            self.fillData(result);
        })
    }

    ExpandableAjaxList.prototype.fillData = function (jsonData) {
        var self = this;

        var listItems = $(self.ulSelector + ' li');
        var tempData = [];

        $.each(jsonData, function (index, value) {
            tempData.push({ id: value[self.fieldID], text: value[self.fieldText] });
        });
        tempData.sort(function (a, b)
        {
            return self.sortData(a, b);
        });

        if (listItems.length == 0) {
            self.appendItems(tempData);
        } else {
            self.mergeListItems(listItems, tempData);
        }
    }

    ExpandableAjaxList.prototype.sortIDs = function (id1, id2) {
        var self = this;

        if (id1 == id2) return 0;
        if (self.sortArrange == 'asc') {
            if (id1 > id2) return 1;
            else return -1;
        } else {
            if (id1 < id2) return 1;
            else return -1;
        }
    }
    ExpandableAjaxList.prototype.sortData = function (a, b) {
        var self = this;
        return self.sortIDs(a.id, b.id);
    }
    
    ExpandableAjaxList.prototype.appendListItem = function (value) {
        var self = this;

        var item = $('<li></li>')
                    .attr('data-id', value.id)
                    .text(value.text)
                    .hide();
        $(self.ulSelector).append(item);
        item.slideDown("slow");
    }
    ExpandableAjaxList.prototype.beforeListItem = function (listItem, value) {
        var item = $('<li></li>')
                    .attr('data-id', value.id)
                    .text(value.text)
                    .hide();
        $(listItem).before(item);
        item.slideDown("slow");
    }
    ExpandableAjaxList.prototype.afterListItem = function (listItem, value) {
        var item = $('<li></li>')
                    .attr('data-id', value.id)
                    .text(value.text)
                    .hide();
        $(listItem).after(item);
        item.slideDown("slow");
    }
    ExpandableAjaxList.prototype.removeListItem = function (listItem) {
        $(listItem).slideUp("slow");
        $(listItem).remove();
    }

    ExpandableAjaxList.prototype.appendItems = function (data) {
        var self = this;

        $.each(data, function (index, value) {
            self.appendListItem(value);
        });
    }
    ExpandableAjaxList.prototype.removeItems = function (data) {
        var self = this;
        
        $.each(data, function (index, value) {
            self.removeListItem(value);
        });
    }
    ExpandableAjaxList.prototype.mergeListItems = function (listItems, tempData) {
        var self = this;

        var listDataIndex = 0;
        var tempDataIndex = 0;
        var listItem, tempDataItem;

        while ((listItem = listItems[listDataIndex]) && (tempDataItem = tempData[tempDataIndex])) {
            var id = $(listItem).data("id");
            var sortDataResult = self.sortIDs(id, tempDataItem.id);

            if (sortDataResult == 0) {
                tempDataIndex++;
                listDataIndex++;
                continue;
            }
            else if (sortDataResult == 1) {
                self.beforeListItem(listItem, tempDataItem);
                tempDataIndex++;
                continue;
            } else {
                self.removeListItem(listItem);
                listDataIndex++;
                continue;
            }
        }

        if (!listItem) {
            listItem = listItems[listDataIndex - 1];
            var id = $(listItem).data("id");

            var dataToAdd = tempData.filter(function(element) { 
                return self.sortIDs(id, element.id) == -1;
            });
            self.appendItems(dataToAdd);
        } else if (!tempDataItem)
        {
            listItem = listItems[listDataIndex];
            var id = $(listItem).data("id");

            var dataToRemove = listItems.filter(function (index, element) {
                var elemId = $(element).data("id");
                return self.sortIDs(elemId, id) != -1;
            });
            self.removeItems(dataToRemove);
        }
    }

    window.jQueryExpandableAjaxList = ExpandableAjaxList;
})(jQuery);