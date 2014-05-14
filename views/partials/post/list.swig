{% for post in posts %}
	{% include "single.swig" with post %}
{% endfor %}

<div class="modal fade" id="other-likes-modal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				Others who like this post
			</div>
			<div class="modal-body">
				<table class="table table-striped table-bordered">
					<thead>
						<tr>
							<th>Username</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="report-modal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header clearfix">
				<p class="pull-left">Report this post</p>
				<em class="pull-right fa fa-times" data-dismiss="modal"></em>
			</div>
			<div class="modal-body">
				<form method="post" action="javascript:void(0)" class="form-horizontal" data-event="submit" data-action="post.report">
					<input type="hidden" name="postId" value="" />
					<div class="form-group">
						<label class="col-sm-3">
							Reason
						</label>
						<div class="col-sm-9">
							<textarea class="form-control" rows="6" name="reason" placeholder="Please give a reason for reporting this post."></textarea>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-9 col-sm-offset-3">
							<button class="btn btn-orange">
								Report
							</button>
						</div>
					</div>
				</form>	
			</div>
		</div>
	</div>
</div>