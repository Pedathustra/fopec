if exists( select name from sys.procedures where name = 'insVote')
begin
	drop proc insVote
end
go

create proc insVote
	@crowdsourced_research_id int,
	@person_id int,
	@vote_type varchar(100)
as 
	set nocount on;

	insert into crowdsourced_research_vote
	(
		crowdsourced_research_id, 
		person_id, 
		vote_type,
		created,
		updated
	)
	values
	( 
		@crowdsourced_research_id, 
		@person_id, 
		@vote_type,
		getdate(),
		getdate()
	);

	return 0;
		
go

