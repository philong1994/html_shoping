
app = {
	models: {},
	views: {},
	collections: {},
	routers: {},
	init: function() {
        ajax_options = new app.models.Ajax_Options({
            store_id: InfoStore['post_id'], 
            category_id: InfoStore['category_id'], 
            keyword: 'KEY_NULL', 
            perPage: InfoStore['perPage'], 
            // page: 0, 
            filter: 'FILTER_NULL',
            loadmore: true
        });
	    new app.views.Front();
    }
};

app.models.Ajax_Options = Backbone.Model.extend({
    'store_id': '',
    'category_id': '',
    'keyword': '',
    'perPage': '',
    'page': '',
    'totals': '',
    'filter': '',
    'action': '',
    'loadmore': ''
});

app.models.Inventory = Backbone.Model.extend({
    defaults: {
        'title': '',
        'image': '',
        'price': '',
        'discount': '',
        'url': '',
        'visit': ''
    }
});

app.collections.Inventories = Backbone.Collection.extend({
    model: app.models.Inventory
});

app.views.Inventory = Backbone.View.extend({
    tagName: 'li',
    className: 'col-md-3 col-sm-6',
    template: _.template($('#product-list-template').html()),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

app.views.Inventories = Backbone.View.extend({
    el: 'body',
    initialize: function(data) {
        this.collection = new app.collections.Inventories(data);
        this.render();
    },
    render: function() {
        var _this = this;
        _.each(this.collection.models, function(itemData) {
            _this.render_Inventory(itemData);
        }, this);
    },
    render_Inventory: function(itemData) {
        var _this = this;
        var new_inventory = new app.views.Inventory({
            model: itemData
        });
        $('.product-list-template .product-list').append(new_inventory.render().el);
    }
});

app.views.Ajax_Inventory = Backbone.View.extend({
    el: 'body',
    initialize: function(ajax_options) {
        $.ajax({
            type: 'POST',
            url: FLP_POSTS_URL,
            data:{
                store_id: ajax_options.get('store_id'),
                category_id: ajax_options.get('category_id'),
                keyword: ajax_options.get('keyword'),
                perPage: ajax_options.get('perPage'),
                page: ajax_options.get('page'),
                filter: ajax_options.get('filter'),
                action: ajax_options.get('action'),
                loadmore: ajax_options.get('loadmore')
            },
            success: function(data){
                var obj = $.parseJSON(data);
                if(obj['posts_data']) {
                    new app.views.Inventories(obj['posts_data']);
                    $('.pagination-template').html(obj['loadmore']);
                }
            }
        });
    }
});

app.views.Front = Backbone.View.extend({
    el: 'body',
    events: {
        'click a.load-more-post': 'LoadMoreProduct',
    },
    initialize: function() {

    },

    LoadMoreProduct: function(ev) {
        ev.preventDefault();
        var target = ev.currentTarget;
        var _page = $(target).data('page');
        var _totals = $(target).data('totals');
        var _action = $(target).data('action');
        var _slug = $(target).data('slug');
        ajax_options.set('page', _page);
        ajax_options.set('totals', _totals);
        ajax_options.set('action', _action);
        new app.views.Ajax_Inventory(ajax_options);
        var el_offset = $(target).offset().top;
        $('html, body').animate({
            scrollTop: el_offset - 30
        }, 1000);
    }
});





app.init();