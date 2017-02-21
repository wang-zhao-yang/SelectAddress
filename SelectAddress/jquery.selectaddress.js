(function ($) {
    $.fn.address = function (option) {
        var opts = $.extend({
            url:"Area.xml",
            pn:"province",
            ct:"city",
            cny:"country",
            attrName:"name",
            attrValue:"value",
        }, option||{});
        // 定义一个变量指向 this，方便在闭包中处理
        var target = this;
        opts.province = $("<select id='province'><option>请选择省</option></select>");
        opts.city = $("<select id='city'><option>请选择市</option></select>");
        opts.county = $("<select id='county'><option>请选择县</option></select>");
        // 通过 Ajax 加载文件，并且初始化所有的 xml 节点
        opts.areaXml;
        $.get(opts.url, function (data) {
            opts.areaXml = data;
            setAddress();
        });
        function setAddress() {
            // 省
            setupNode(opts.pn, opts.province);
            // 市
            opts.province.change(function () {
                opts.county.find("option:gt(0)").remove();
                opts.city.find("option:gt(0)").remove();
                setupNode(opts.pn+"[value='"+$(this).val()+"'] "+opts.ct, opts.city);
            });
            // 县
            opts.city.change(function () {
               opts.county.find("option:gt(0)").remove();
               setupNode(opts.ct+"[value='"+$(this).val()+"'] "+opts.cny, opts.county);
            });
            target.append($("<span class='address_c'></span>").append(opts.province));
            target.append($("<span class='address_c'></span>").append(opts.city));
            target.append($("<span class='address_c'></span>").append(opts.county));
        }
        function setupNode(path, node) {
            $(opts.areaXml).find(path).each(function (n) {
               node.append(createNode(this));
            });
        }
        function createNode(obj) {
            return "<option value='"+$(obj).attr(opts.attrValue)+"'>"+$(obj).attr(opts.attrName)+"</option>";
        }
        return this;
    };
})(jQuery);