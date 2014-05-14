<div class="content post post-{{ post.id }}">
	<a name="{{ post.id }}"></a>
	<div class="row" id="post-{{ post.id }}">
		<div class="post-author col-sm-2 hidden-xs">
			<div class="avatar large">
				<img width="70" height="70" src="{{ sails.config.board.avatarDir }}/{{ post.author.username }}/avatar.png" alt="{{ post.author.username }}" />
			</div>
			<p class="truncate w80">
				<a href="/user/{{ post.author.username }}" class="user-link resize">
					{{ post.author.username }}
				</a>
			</p>
			<p title="Group" class="group">
				<em class="fa fa-group"></em > Admin
			</p>
			<span title="Posts" class="post-count">
				<em class="fa fa-pencil"></em > {{ post.author.posts }}
			</span>
			<span title="Topics" class="post-count">
				<em class="fa fa-pencil"></em > {{ post.author.topics }}
			</span>
		</div>
		<div class="post-body col-sm-10 col-xs-12">
			<div class="post-info">
				<div class="clearfix">
					<div class="pull-left">
						<span class="date" title="{{ post.createdAt }}">{{ post.createdAt|toDate }}</span> - <a href="/{{ post.forum.name|toUrl }}/{{ post.topic.name|toUrl }}-{{ post.topic.id }}/#{{ post.id }}" class="topic-name">{{ post.name }}</a>
					</div>
					<div class="pull-right post-tools">
						{% include "tools.swig" with post %}
					</div>
				</div>
			</div>
			<div class="post-content">
				{{ post.content|raw }}
			</div>
			<div class="post-extras clearfix">
				{% if post.edits > 0 %}
					<div class="edit-count pull-left">
						Edited {{ post.edits }} times
					</div>
				{% endif %}

				{% include "likes.swig" with post %}
			</div>
			{% if post.quoted %}
				<div class="post-quoted">
					<a class="external" href="/{{ topic.forum.name|toUrl }}/{{ topic.name|toUrl }}-{{ topic.id }}/#{{ post.quoted.id }}">
						Reply to {{ post.quoted.name }}
					</a>
				</div>
			{% endif %}
			{% if post.attachments.length %}
				<div class="post-attachments">
					<h5>Attachments</h5>
					{% for attachment in post.attachments %}
						<div class="post-attachment {{ attachment.mime }} {% if sails.config.files.images.indexOf(attachment.mime) !== false %}inline{% endif %}">

							{% if sails.config.files.images.indexOf(attachment.mime) !== false %}
								<a class="external" href="/uploads/{{ attachment.name }}" target="_blank">
									<img data-toggle="popover" data-title="{{ attachment.fileName }} - Uploaded on {{ attachment.createdAt|toDate }}" data-content="Size: {{ attachment.size }}<br />Type: {{ attachment.mime }}" src="/uploads/{{ attachment.fileName }}" alt="{{ attachment.name }}" title="{{ attachment.name }}" />
								</a>
							{% else %}
								<a class="external" href="/uploads/{{ attachment.name }}" target="_blank">
									{{ attachment.fileName }}
								</a>
							{% endif %}

						</div>
					{% endfor %}
				</div>
			{% endif %}
		</div>
	</div>
</div>