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
	if not exists(
		select * 
		from crowdsourced_research_vote
		where crowdsourced_research_id = @crowdsourced_research_id
		and person_id = @person_id
		) 
	begin
		return -1
	end   
	
	update	crowdsourced_research_vote
	set		vote_type = @vote_type,
			updated = getdate()
	where	 crowdsourced_research_id = @crowdsourced_research_id
		and	person_id = @person_id


	return 0;
		
go

