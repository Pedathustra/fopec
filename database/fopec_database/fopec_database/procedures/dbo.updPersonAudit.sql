if exists(select * from sys.procedures where name = 'updPersonAudit')
begin 
	drop proc updPersonAudit
end
go


create proc updPersonAudit
	@id int
as

	set nocount on;

	update	person_audit
	set		first_name = first_name + ' DELETED',
			middle_name = middle_name + ' DELETED',
			last_name = last_name + ' DELETED',
			username = username + ' DELETED',
			is_active = 0,
			person_id = 0

	where	person_id = @id;

	

go