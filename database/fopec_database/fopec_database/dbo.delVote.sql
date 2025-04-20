if exists( select name from sys.procedures where name = 'delVote')
begin
	drop proc delVote
end
go

create proc delVote
	@crowdsourced_research_id int,
	@person_id int
as 
	set nocount on;
	delete 
	from crowdsourced_research_vote
	where 
			crowdsourced_research_id = @crowdsourced_research_id
		and person_id = @person_id;

	return 0;
		
go

