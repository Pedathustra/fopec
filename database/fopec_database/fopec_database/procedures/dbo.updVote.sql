if exists( select name from sys.procedures where name = 'updVote')
begin
	drop proc updVote
end
go

create proc updVote
	@crowdsourced_research_id int,
	@person_id int,
	@vote_type varchar(100)
as 
	update	crowdsourced_research_vote
	set		vote_type = @vote_type,
			updated = getdate()
	where	 crowdsourced_research_id = @crowdsourced_research_id
		and	person_id = @person_id


	return 0;
		
go

